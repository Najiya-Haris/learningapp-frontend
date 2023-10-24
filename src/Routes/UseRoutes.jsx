import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/User/Signup";
import Login from "../pages/User/Login";
import Home from "../pages/User/Home";
import UserPublic from "../../Protected/UserPublic";
import UserProtected from "../../Protected/UserProtected";
import Otpverification from "../pages/User/Otpverification";
import Layout from "../pages/User/Layout";
import UserProfile from "../pages/User/userProfile";
import Coursepage from "../pages/User/Coursepage";
import SingleCourse from "../pages/User/SingleCourse"
import Payment from "../pages/User/Payment";
import SuccessPage from "../pages/User/SuccessPage";

function UseRoutes() {
  return (
    <Routes>
      <Route element={<UserPublic />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otpverication/:id" element={<Otpverification />} />
      </Route>
      <Route element={<UserProtected />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/coursepage" element={<Coursepage />} />
          <Route path="/singlecourse/:id" element={<SingleCourse />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/success" element={<SuccessPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default UseRoutes;
