import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Button,
    Input,
    Spinner,
  } from "@material-tailwind/react";
  import { useLocation,useNavigate } from "react-router-dom";
  import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useQueryClient,
  } from '@tanstack/react-query'
import { userAxiosInstance } from "../../api/axios";
import { data } from "autoprefixer";
import { useState } from "react";
import  {DialogWithForm} from "../User/EditProfile"

  export default function BlogCard() {
    const [data,setData]=useState([])
    console.log(data)
    const [img,setImg]=useState(null)
    const [loading,setLoading]=useState(false)
    const queryClient=useQueryClient()
    const location = useLocation();
    const id = location.state && location.state.id
    const onSubmit = () => {
        const formData = new FormData();
        formData.append("image", img);
        setLoading(true)
        userAxiosInstance.post(`/uploadImage/${id}`, formData,{
            headers:{
              "Content-Type":"multipart/form-data"
            }}).then((response) => {
          console.log('works fine',response);
          queryClient.invalidateQueries('repoData')
          setLoading(false)
        });
      };
    const {isPending,error,dta}=useQuery({
        queryKey:['repoData'],
        queryFn:()=>{
            userAxiosInstance.get(`/userprofile/${id}`).then((res)=>{setData(res.data.data),console.log(res.data.data)})
        }
    })
    
    return (
        <div className="flex justify-center h-screen items-center">
      <Card className="max-w-[24rem] overflow-hidden ">
      <Typography variant="h4" color="blue-gray" className="flex justify-center pt-5">
            USER PROFILE
          </Typography>
          <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8 p-5"
      >
        {data.image?<Avatar
          size="lg"
          variant="circular"
          src={data.image}
          alt="tania andrew"
        />:        <Avatar
        size="lg"
        variant="circular"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        alt="tania andrew"
      />}
                <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
            {data.userName}
            </Typography>
          </div>
          <Typography color="blue-gray">{data.email}</Typography>
        </div>
      </CardHeader>
        <CardBody className="flex justify-center flex-col ">
       
          <div className="flex justify-center flex-col"><DialogWithForm name={data.userName} id={data._id}/></div>
          <Input type="file" onChange={(e)=>setImg(e.currentTarget.files[0])}/>
          <Button className="text-sm px-2 py-1" onClick={onSubmit}>{loading?<Spinner/> :'submit'}</Button>
        </CardBody>
      </Card>
      </div>
    );
  }
