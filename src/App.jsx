import "./App.css";
import { Route , Routes} from "react-router-dom";
import Home from "./Pages/Home";
import React from 'react';
import Navbar from "./components/Common/Navbar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import VerifyEmail from "./Pages/VerifyEmail";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col  font-inter">
        <Navbar/>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>
         <Route path="verify-email" element={<VerifyEmail /> }  />  
       </Routes>
    </div>
  )
}

export default App
