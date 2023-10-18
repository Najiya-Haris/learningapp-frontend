import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/Admin/adminLogin";
import AdminHome from "../pages/Admin/AdminHome";
import AdminPublic from "../../Protected/AdminPublic";
import AdminProtected from "../../Protected/AdminProtected";
import Layout from "../pages/Admin/Layouts";
import Userlist from "../pages/Admin/Userlist"
import AddCourse from "../pages/Admin/AddCourse";
import { Courses } from "../pages/Admin/Courses";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminPublic />}>
        <Route exact path="/login" element={<AdminLogin />} />
      </Route>
      <Route element={<AdminProtected />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<AdminHome />} />
          <Route path="/userlist" element={<Userlist />}></Route>
          <Route path="/addcourse" element={<AddCourse />}></Route>
          <Route path="/course" element={<Courses />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
