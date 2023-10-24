import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import {toast ,ToastContainer} from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";
import { adminAxiosInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";
  
  export default function addcourse() {
    const [name,setName]=useState('')
    const [about,setAbout]=useState('')
    const [Price,setPrice]=useState()
    const [image,setImage]=useState(null)
    const formData = new FormData()
    formData.append("name", name);
    formData.append("about", about);
    formData.append("image", image);
    formData.append("price", Price);
    const navigate=useNavigate()
    const handleSubmit=async()=>{
        try {
            let res=await adminAxiosInstance.post('/addcourse',formData,{
                headers:{
                  "Content-Type":"multipart/form-data"
                },
              })
              toast.success(`Added sucessfully`);
              
              console.log("hiiii",res);
            
        } catch (error) {
            
        }
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
    return (
        <div className="">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Course
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Course Name
            </Typography>
            <Input
              size="lg"
              placeholder="Course Name"
              onChange={(e)=>setName(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
                   <Typography variant="h6" color="blue-gray" className="-mb-3">
              Price
            </Typography>
            <Input
              size="lg"
              type="number"
              placeholder="price"
              onChange={(e)=>setPrice(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              About the Course
            </Typography>
            <Input
              size="lg"
              placeholder="About the Course"
              onChange={(e)=>setAbout(e.target.value)}

              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
           
            
            {/* Image Input Field */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Upload Course Image
            </Typography>
            <Input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
                
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
  
          <Button type="submit" className="mt-6" fullWidth>
            Add
          </Button>
        </form>
      </Card>
      <ToastContainer/>
      </div>
    );
  }
  