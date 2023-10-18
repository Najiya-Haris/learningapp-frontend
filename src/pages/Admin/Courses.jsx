import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { adminAxiosInstance } from "../../api/axios";

export function Courses() {
  const [courseData, setCourseData] = useState([]);
  console.log(courseData+"dsgfdsdfgefhretghjrethyj")
  useEffect(() => {
    adminAxiosInstance.get('/course') 
      .then((response) => {
        setCourseData(response.data.courses);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
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
                Edit
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {courseData.map(({ _id,description, courseName, image }, index) => (
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
                <Typography as="a" href={`/edit-course/${_id}`} variant="small" color="blue-gray" className="font-medium">
                  Edit
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
