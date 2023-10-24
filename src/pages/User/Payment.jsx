import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { userAxiosInstance } from "../../api/axios"
import CheckOut from "./CheckOut"
import { useParams } from "react-router-dom"


const stripePromise=loadStripe('pk_test_51O3eavSIVDzsjQ4OR5KfnEcYJPg0gUomrFWNUKPUPuwmdHSJ5LLG7yeuUYsk4wlEGKEV2izsGcTmaet5mtAniAYW0094P92I55')
const Payment=()=>{
    const {id}=useParams()
    const [clientSecret,setClientSecret]=useState("");
    const [price,setPrice]=useState(0);

    useEffect(()=>{
        const request=async ()=>{
            try {
                const res=await userAxiosInstance.get(`/getpaymentdata/${id}`)
                console.log(res);
                setClientSecret(res.data.clientSecret)
                setPrice(res.data.price)
            } catch (error) {
                console.log(error.message);
            }
        }
        request()
    },[])
    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

    return(
        <>
            <div className="app">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckOut Secret={clientSecret} price={price} id={id}/>
                    </Elements>
                )}
            </div>
        </>
    )
}

export default Payment