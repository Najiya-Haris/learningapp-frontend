import { CheckIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
   
  export default function SuccessPage() {
    const navigate=useNavigate()
    return (
        <div className="flex justify-center py-5">
      <Card>
        <CardHeader shadow={false} floated={false} className="h-36">
          <CheckIcon color="green"/>
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              Payment Successful
            </Typography>
            {/* <Typography color="blue-gray" className="font-medium">
              $95.00
            </Typography> */}
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            onClick={()=>navigate('/')}
          >
            Explore course
          </Button>
        </CardFooter>
      </Card>
      </div>
    );
  }