import React from 'react'
import { Link } from 'react-router-dom'
import image1 from '../assets/tokyo.jpg'
import './HomeUi.css' ;
import bigben from '../assets/effiletower.jpg'


function HomeUi() {
  return (
    <div className='w-full h-screen flex flex-col py-10 items-center   bg-[#cec7d3] text-black'>
         <div className='w-[500px] flex flex-col items-center justify-center'>
              <h1 className='text-5xl font-sans font-extrabold text-gray-700'> DISCOVER THE BEST <br></br> PLACE WELCOME</h1>
              <p className='w-[80%] mt-5 font-semibold'>for a very low coast visit every place of the earth, Plan your journey with us , he you got planned journey for your trip </p>

            <Link to="/plantrip">
               <button className='bg-gray-950 text-white border border-black p-2 text-sm hover:scale-105 hover:bg-slate-700 rounded-md '> Plan trip</button>
             </Link>

             <div id="container">
        <div id='leftbox'>
          <div id='limg'>
            <img src={image1}  alt="" class='images'/>
          </div>
          <div id="ltext">
             
          </div>
        </div>

        <div id='rightbox' >
          <div id="rimg">
            <img src={bigben} alt="" class='images'/>
          </div>
          <div id="rtext">
              Tokyo, London
          </div>
        </div>
         </div>
         
         </div>
      
    </div>
  )
}

export default HomeUi
