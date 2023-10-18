import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { userAxiosInstance } from "../../api/axios";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';

function Otpverification() {
  const [validUrl,setValidUrl]=useState(false)
  const [otp,setOtp]=useState('')
  const {id}=useParams();
  const navigate=useNavigate()
  const verifyEmailUrl = async(e) => {
    e.preventDefault();
    await userAxiosInstance.post('/verifyemail',{
      id,otp
    }).then ((res)=>{
      console.log(res);
    if(res.data.status){
      console.log('otp verified');
      localStorage.setItem("currentUser", res.data.token);
      navigate(`/login`)
      console.log('BHB');
    }else{
      if(res.data.message){
        toast(res.data.message)
      }
    }})
  };
 
      return (
        <div className='flex justify-center h-screen items-center'>
        <Card   color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            OTP
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="OTP" onChange={(e) => setOtp(e.target.value)} />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button className="mt-6" fullWidth onClick={verifyEmailUrl}>
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a href="#" className="font-medium text-gray-900">
                Sign In
              </a>
            </Typography>
          </form>
        </Card>
        <ToastContainer/>
        </div>
      );
    }
    
  

export default Otpverification

