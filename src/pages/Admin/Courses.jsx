import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
} from "@material-tailwind/react";
import { adminAxiosInstance } from "../../api/axios";
import DialogWithForm from "./EditCourse";
import { ToastContainer, toast } from 'react-toastify';

export function Courses() {
  const [courseData, setCourseData] = useState([]);
  const [reload, setReload] = useState(false)

  const fetchCourseData = async () => {
    try {
      const response = await adminAxiosInstance.get('/course');
      setCourseData(response.data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [reload]);

  const handleDeleteCourse = (courseId) => {
    adminAxiosInstance
      .delete(`/delete/${courseId}`)
      .then((res) => {
        toast.success('delted successfully')
        console.log(res);
        fetchCourseData(); 
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Name
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Description
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Photo
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Price
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Edit
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Delete
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {courseData.map(({ _id, description, courseName, image,price }, index) => (
            <tr key={_id} className={index % 2 === 0 ? 'bg-blue-gray-50' : ''}>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {courseName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {description}
                </Typography>
              </td>
              <td className="p-4">
                <img src={image} alt="Course" className="h-12 w-12 object-cover" />
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {price}
                </Typography>
              </td>
             
              <td className="p-4">
                <div><DialogWithForm reload={reload} setReload={setReload} name={courseName} description={description} id={_id}/></div>
              </td>
              <td className="p-4">
                <button onClick={() => handleDeleteCourse(_id)} className="text-red-500">
                <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    <ToastContainer/>
    </>
  );
}
