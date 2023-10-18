import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

import "./Signup.css";
import { userAxiosInstance } from "../../api/axios";
import { setuserdetails } from "../../Redux/UserSlice";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import axios from 'axios'; // Import axios here



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [guser, setGuser] = useState([]);

  const glogin = useGoogleLogin({
    onSuccess: (codeResponse) => setGuser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (guser) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${guser.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          let data = res.data;
          await userAxiosInstance
            .post("/googlesignup", { data })
            .then((res) => {
              if (res.data.access) {
                const userDetails = {
                  name: res.data.user.userName,
                  email: res.data.user.email,
                  id: res.data.user._id,
                };

                dispatch(setuserdetails({ userInfo: userDetails }));
                localStorage.setItem("currentUser", res.data.token);
              
                  
                  navigate("/");
                
              }else{
                toast.error(res.data.message)

              }
            });
        })
        .catch((err) => console.log(err));
    }
  }, [guser]);  
  
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setError("Email is required");
      return;
    }
    if (password === "") {
      setError("Password is required");
      return;
    }
    await userAxiosInstance
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("resss", res);
        if(res.data.access){
          const { email, _id, userName } = res.data.data;
          const userDetails = {
            name: userName,
            email: email,
            id: _id,
          };
          dispatch(setuserdetails({ userInfo: userDetails }));
        localStorage.setItem("currentUser", res.data.token);
        navigate("/");

        }
        else{setError(res.data.message)}
            })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center h-screen items-center">
      <Card className="w-full max-w-[48rem] flex-row">
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
          <Typography variant="h4" color="black">
            Login
          </Typography>
          <Typography color="black" className="mt-1 font-normal">
            Enter your details to login.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                id="email"
                value={email}
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="please eneter your mail"
                size="lg"
                label="Email"
              />
              {/* {error && <p className="text-red-500">{error}</p>} */}
              <Input
                id="password"
                value={password}
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
                label="Password"
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Login
            </Button>
            <Typography color="back" className="mt-4 text-center font-normal">
              Didnt have an account?{" "}
             <Link to={'/signup'} className="font-medium text-gray-900">
                   Sign up
                  </Link>
            </Typography>
          </form>
          <Button
            className="mt-6"
            onClick={() => {
              glogin();
            }}
          >
            google
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
