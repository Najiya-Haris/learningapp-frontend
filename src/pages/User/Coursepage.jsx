import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import './Home.css';
import { userAxiosInstance } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    console.log('ghj');
    userAxiosInstance.get("/course").then((res) => setData(res.data.courseLists));
  }, []);

  return (
    <div>
      
     
        <div className='lg:flex lg:flex-wrap justify-center gap-3'>
          {data.map((item, index) => (
            <Card key={index} className="w-72 mt-6 lg:w-1/3 lg:mt-0">
              <CardHeader floated={false} className="h-40 ">
                <img src={item.image} alt={item.courseName}  className="w-full h-40 object-cover"/>
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {item.courseName}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                  {item.description}
                </Typography>
              </CardBody>
              <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Like">
                  <Typography as="a" href="#facebook" variant="lead" color="blue" textGradient>
                    <i className="fab fa-facebook" />
                  </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                  <Typography as="a" href="#twitter" variant="lead" color="light-blue" textGradient>
                    <i className="fab fa-twitter" />
                  </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                  <Typography as="a" href="#instagram" variant="lead" color="purple" textGradient>
                    <i className="fab fa-instagram" />
                  </Typography>
                </Tooltip>
                <Button onClick={()=>navigate('/singlecourse')} color="blue" >Buy This Course</Button> 
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

  );
}

export default Home;
