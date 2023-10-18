import {
  Card,
  Input,
  // Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { adminAxiosInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    if (email === "") {
      setError("Email is required");
      return;
    }
    if (password === "") {
      setError("Password is required");
      return;
    }
    await adminAxiosInstance
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("loooo",res)
        if(res.data.access==false){
          console.log('not access',res.data.message)
          setError(res.data.message)
        }else{
          
        localStorage.setItem('currentAdmin', JSON.stringify(res?.data));
        navigate("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center" style={{ marginTop: "70px" }}>
      <Card color="transparent" shadow={false} className="border p-4">
        <Typography variant="h4" color="blue-gray">
          Admin Login
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              value={email}
              size="lg"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
            <Input
              type="password"
              value={password}
              size="lg"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
