'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IoArrowBackCircle } from 'react-icons/io5';
const CourseForm = () => {
  const [certId, setCertId] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/Verify-certificate/${certId}`, {
      });
      const data = await response.json();
      if (data._id === certId) {
        console.log("Certificate is valid")
      } else {
        console.log("Certificate is invalid")
      }
      // Handle successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

  return (
    <div className='w-full h-screen flex flex-col gap-4 justify-center items-center'>
      <Link href="/" >
        <div className='flex gap-4 items-center'>
          <IoArrowBackCircle size={25} />
          <p className='text-xl font-semibold'>Back to Home</p>
        </div>
      </Link>
      <h1 className='text-2xl font-semibold text-center'>Verify Certificate</h1>
      <form onSubmit={handleSubmit} className="w-[25%] mx-auto p-6 bg-gray-800 shadow-md rounded-md">
        <div className="mb-4">
          <Input
            name="certificateId"
            placeholder="Student Name"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="w-full focus:outline-none p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
        </div>

        <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CourseForm;

