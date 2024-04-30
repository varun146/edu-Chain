// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AcademicCertificateIssuer {
    address private owner;
    mapping(bytes32 => Certificate) private certificates;

    struct Certificate {
        string studentName;
        string institutionName;
        string courseTitle;
        string courseDescription;
        bool issuedStatus;
    }

    event CertificateIssued(
        bytes32 indexed certificateId,
        string studentName,
        string institutionName,
        string courseTitle,
        string courseDescription
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function issueCertificate(
        string memory _studentName,
        string memory _institutionName,
        string memory _courseTitle,
        string memory _courseDescription
    ) public onlyOwner {
        bytes32 certificateId = keccak256(
            abi.encodePacked(_studentName, _institutionName, _courseTitle, _courseDescription)
        );

        require(!certificates[certificateId].issuedStatus, "Certificate already issued.");

        certificates[certificateId] = Certificate({
            studentName: _studentName,
            institutionName: _institutionName,
            courseTitle: _courseTitle,
            courseDescription: _courseDescription,
            issuedStatus: true
        });

        emit CertificateIssued(
            certificateId,
            _studentName,
            _institutionName,
            _courseTitle,
            _courseDescription
        );
    }

    function verifyCertificate(
        string memory _studentName,
        string memory _institutionName,
        string memory _courseTitle,
        string memory _courseDescription
    ) public view returns (bool) {
        bytes32 certificateId = keccak256(
            abi.encodePacked(_studentName, _institutionName, _courseTitle, _courseDescription)
        );

        return certificates[certificateId].issuedStatus;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address.");
        owner = newOwner;
    }
}
