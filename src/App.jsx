
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UseRoutes from "./Routes/UseRoutes";
import AdminRoutes from "./Routes/AdminRoutes";

 
export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<UseRoutes/>} />
        <Route path="/admin/*" element={<AdminRoutes/>}/>
      </Routes>
    </BrowserRouter>
  );
}