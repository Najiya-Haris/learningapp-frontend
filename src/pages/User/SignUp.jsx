import {
  Card,
  Input,
  Button,
  Typography,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import {toast ,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import "./Signup.css";
import { useEffect, useState } from "react";
import { userAxiosInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setuserdetails } from "../../Redux/UserSlice";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword,setConfirmPassword]=useState("")
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [guser, setGuser] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserNameError("");
    setEmailError("");
    setPasswordError("");
    // setMsg(res.message)
    if (userName === "") {
      setUserNameError("Username is required");
      return;
    }
    if (email === "") {
      setEmailError("Email is required");
      return;
    }

    if (password === "") {
      setPasswordError("Password is required");
      return;
    }
    if (confirmpassword !== password) {
      setConfirmPasswordError("Password mismatch");
      return;
    }
    await userAxiosInstance
      .post("/signup", {
        userName,
        email,
        password,
        confirmpassword
      })
      .then((res) => {
        if (res.data.register) {
          navigate(`/otpverication/${res.data.id}`);
          alert(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <ToastContainer/>
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
            Sign Up
          </Typography>
          <Typography color="black" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                id="username"
                value={userName}
                type="text"
                name="username"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="please enter your username"
                label="Name"
              />
              {userNameError && <p className="text-red-500">{userNameError}</p>}

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
              {emailError && <p className="text-red-500">{emailError}</p>}
              <Input
                id="password"
                value={password}
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
                label="Password"
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
            <Input
                id="password"
                value={confirmpassword}
                type="password"
                name="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="lg"
                label="confirmPassword"
              />
                            {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}

            <Button className="mt-6" type="submit" fullWidth>
              Register
            </Button>
            <Typography color="back" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a href="#" className="font-medium text-black-900">
                Sign In
              </a>
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
