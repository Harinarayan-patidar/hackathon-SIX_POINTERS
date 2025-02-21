import "./App.css";

import Home from "./pages/Home";
import {PlanTrip} from "./pages/PlanTrip"
import {MyTrip} from "./components/MyTrip";
import About from "./components/About";

import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";

function App() {
  
  const[isLoggedIn , setIsLoggedIn] = useState(false);

  return (
    <div className="w-screen h-scree flex flex-col">
       
        <Routes>
           <Route path="/" element= {<Home/>}/>
           <Route path="/planTrip" element={<PlanTrip />}> </Route>
           <Route path="/myTrip" element={<MyTrip/>}> </Route>
           <Route path="/aboutus" element={<About></About>}> </Route>
            
        </Routes>

    </div>
  );
}

export default App;
