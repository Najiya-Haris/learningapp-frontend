import axios from "axios" ;
import { UserAPI,adminAPI } from "../constance/api";

// Create an Axios instance for the User API
const userAxiosInstance = axios.create({
    baseURL: UserAPI,
  });

  //create an Axiosinstance for the Admin API
  const adminAxiosInstance = axios.create({
    baseURL:adminAPI,
  })


  export {userAxiosInstance,adminAxiosInstance};   
 