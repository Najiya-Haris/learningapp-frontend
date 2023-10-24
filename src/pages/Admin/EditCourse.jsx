import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { adminAxiosInstance } from "../../api/axios";
 
export default function DialogWithForm({name,description,id ,reload,setReload}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [coursename,setCourseName]=useState('')
  const [about,setAbout]=useState('')
  const [price,setPrice]=useState()
  const [image,setImage]=useState(null)
  const handleSubmit=async()=>{
    adminAxiosInstance.post("/editcourse",{coursename,about,price,id:id}).then((res)=>{handleOpen()})
    setReload(!reload)
  }
  useEffect(()=>{
    setCourseName(name)
    setAbout(about)
    setPrice(price)
    
  },[name,about,price,image])
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
    <>
      <Button onClick={handleOpen}>edit</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Edit course
            </Typography>
         
            <Typography className="-mb-2" variant="h6">
            course name
            </Typography>
            <Input label="name" size="lg" value={coursename} onChange={(e)=>setCourseName(e.target.value)} />
            <Typography className="-mb-2" variant="h6">
            price
            </Typography>
            <Input label="price" size="lg" value={price} onChange={(e)=>setPrice(e.target.value)} />
            <Typography className="-mb-2"  variant="h6">
              description
            </Typography>
            <Input label="about the course" value={about} onChange={(e)=>setAbout(e.target.value)} size="lg" />
          </CardBody>
          <Input type="file" onChange={handlePhotoChange}/>
         
          <CardFooter className="pt-0">
            <Button variant="gradient"  onClick={handleSubmit} fullWidth>
              Update
            </Button>          
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
            
           
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}