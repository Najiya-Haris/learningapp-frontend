import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Avatar,
     Rating
  } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userAxiosInstance } from '../../api/axios';
import {loadStripe} from '@stripe/stripe-js'
import { useSelector } from "react-redux";

const stripePromise = loadStripe("pk_test_51O3eavSIVDzsjQ4OR5KfnEcYJPg0gUomrFWNUKPUPuwmdHSJ5LLG7yeuUYsk4wlEGKEV2izsGcTmaet5mtAniAYW0094P92I55")
   
  export default function HorizontalCard() {
    const params = useParams();
    const [newdata,setNewData]=useState([])

    
    const id = params.id
    useEffect(()=>{
      userAxiosInstance.get(`/singlecourse/${id}`).then((res)=>setNewData(res));

    },[])
    const { courseName, description, image, price } = newdata.data ? newdata.data.data : {};

// const makePayment=async()=>{
//   console.log(id);
//   const stripe = await loadStripe("pk_test_51O3eavSIVDzsjQ4OR5KfnEcYJPg0gUomrFWNUKPUPuwmdHSJ5LLG7yeuUYsk4wlEGKEV2izsGcTmaet5mtAniAYW0094P92I55")
//   userAxiosInstance.post('/payment',{id}).then((res)=>{
//     console.log(res);
//     const result = stripe.redirectToCheckout({
//       sessionId:res.id
//     })
//     if(result.error){
//       console.log(result);
//     }
//   })
// }

// const makePayment = async () => {
//   try {
 
//     const { data } = await userAxiosInstance.post('/payment', { id }); 
//     console.log("jhjjgggggg");
//     const stripe = await stripePromise;
//     console.log(data);
//     const { error } = await stripe.redirectToCheckout({
//       sessionId: data.clientSecret, 
//     });

//     if (error) {
//       console.error(error);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

const navigate=useNavigate()
    
    return (
        <>
      <Card className="w-full max-w-full flex-row container p-5">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src={image}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
          {courseName}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
           what will you lear from this course?
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
          {description}
          </Typography>
          <a href="#" className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardBody>
      </Card>

      <div className="  h-[20rem] p-5 pt-10 ">
        <div className=" grid grid-cols-3 h-[12.3rem] ">
            <div className="flex justify-center ">

            <Card className="w-4/6">
      <CardHeader shadow={false} floated={false} className="h-[8rem]">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK1UmD_R8WErwEE12Gac86SLr66W3fFEBRKsvNFYGVKw&s"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="h-[7rem]">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            detailde documents
          </Typography>
      
        </div>
        
      </CardBody>
   
    </Card>
  
            </div>
            <div className="  flex justify-center">
                
            <Card className="w-4/6">
      <CardHeader shadow={false} floated={false} className="h-[8rem]">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvXKWsD25jVa0AKF5UffibfIM_ErV2E-Dq0x4bPGKNLQ&s"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="h-[7rem]">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
          Uploaded Videos
          </Typography>
          <Typography color="blue-gray" className="font-medium">
          
          </Typography>
        </div>
        
      </CardBody>
   
    </Card>
            </div>
            <div className=" flex justify-center">
                
            <Card className="w-4/6">
      <CardHeader shadow={false} floated={false} className="h-[8rem]">
        <img
          src="https://www.talentlms.com/blog/wp-content/uploads/2016/06/TLMS_20200630_1200x628.png"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="h-[7rem]">
        <div className="mb-2 flex items-center justify-between">
         <Button onClick={()=>navigate(`/payment/${id}`)}> 
         Buy Now
         </Button>
         
          
          <Typography color="blue-gray" className="font-medium">
           ${price}
          </Typography>
        </div>
        
      </CardBody>
   
    </Card>
            </div>
            

        </div>

     </div>

     <Card className="w-full max-w-full flex-row container p-5">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            startups
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Lyft launching cross-platform service this week
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Like so many organizations these days, Autodesk is a company in
            transition. It was until recently a traditional boxed software company
            selling licenses. Yet its own business model disruption is only part
            of the story
          </Typography>
          <a href="#" className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardBody>
      </Card>

      
      <Card className="w-full max-w-full flex-row p-5 ">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            startups
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Lyft launching cross-platform service this week
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Like so many organizations these days, Autodesk is a company in
            transition. It was until recently a traditional boxed software company
            selling licenses. Yet its own business model disruption is only part
            of the story
          </Typography>
          <a href="#" className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardHeader>
        <CardBody>
        <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-full w-full object-cover rounded-e-xl"
          />
        </CardBody>
      </Card>

      <div className="px-8 text-center mt-20">
      <Typography variant="h5" color="blue-gray" className="mb-6 font-medium">
        &quot;This is an excellent product, the documentation is excellent and
        helped me get things done more efficiently.&quot;
      </Typography>
      <Avatar
        src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image"
        size="lg"
      />
      <Typography variant="h6" className="mt-4">
        Tania Andrew
      </Typography>
      <Typography color="gray" className="mb-4 font-normal">
        Lead Frontend Developer
      </Typography>
      <Rating value={5} readonly />
    </div>

    <div className="px-8 text-center mt-20 mb-5">
      <Typography variant="h5" color="blue-gray" className="mb-6 font-medium">
        &quot;This is an excellent product, the documentation is excellent and
        helped me get things done more efficiently.&quot;
      </Typography>
      <Avatar
        src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image"
        size="lg"
      />
      <Typography variant="h6" className="mt-4">
        Tania Andrew
      </Typography>
      <Typography color="gray" className="mb-4 font-normal">
        Lead Frontend Developer
      </Typography>
      <Rating value={5} readonly />
    </div>
      </>
      
    );

  
  }

  
  