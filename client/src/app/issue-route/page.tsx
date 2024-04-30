'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { IoArrowBackCircle } from "react-icons/io5";

interface FormData {
  studentName: string;
  courseTitle: string;
  institutionName: string;
  courseDescription: string;
}

const CourseForm = () => {
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    courseTitle: '',
    institutionName: '',
    courseDescription: '',
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/issue-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("here is certificate id: ", data._id);
      // Handle successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

  return (
    <div className='w-full h-screen flex flex-col gap-4 justify-center items-center'>
      <Link href="" >
        <div className='flex gap-4 items-center'>
          <IoArrowBackCircle size={25} />
          <p className='text-xl font-semibold'>Back to Home</p>
        </div>
      </Link>
      <h1 className='text-2xl font-semibold text-center'>Issue Certificate</h1>
      <form onSubmit={handleSubmit} className="w-[25%] mx-auto p-6 bg-gray-800 shadow-md rounded-md">
        <div className="mb-4">
          <Input
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            className="w-full focus:outline-none p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <Input
            name="courseTitle"
            placeholder="Course Title"
            value={formData.courseTitle}
            onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <Input
            name="institutionName"
            placeholder="Institution Name"
            value={formData.institutionName}
            onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <Textarea
            name="courseDescription"
            placeholder="Course Description"
            value={formData.courseDescription}
            onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
            className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
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
