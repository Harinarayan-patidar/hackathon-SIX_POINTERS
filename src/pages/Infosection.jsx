import React, { useEffect } from 'react';
import placeholderImage from '../assets/Heroscreen.jpg';
import { GetPlaceDetails } from './service/GlobalApi';

function Infosection({ trip }) {

    console.log("trip:-", trip);
useEffect(()=>{
 trip&&GetPlacePhoto();
}, [trip])


    const GetPlacePhoto= async()=>{
       const data={
         textQuery:trip?.trip_name
       }

      const result = await GetPlaceDetails(data).then(resp=>{
        console.log(resp.data)
      })
    }

  return (
    <div className='text-black  flex  flex-col bg bg-white justify-center items-center'>
      {/* Correctly using the imported image variable */}
      <img src={placeholderImage} alt="Placeholder" className=' flex mx-auto border rounded-xl w-[600px]  h-340px  object-cover items-center justify-center' />
      <div className='my-2'> 
         <h2 className='text-4xl font-bold  '>{trip?.trip_name}</h2>
         <div className='flex gap-5 mt-3'>
             <p className='bg-gray-300 border rounded-2xl p-1 border-black'>budget:-{trip?.budget || "moderate"} </p>
             <p className='bg-gray-300 border rounded-2xl p-1 border-black'>{trip?.duration || "undefined"}</p>
             <p className='bg-gray-300 border rounded-2xl p-1 border-black'>{trip?.location}</p>
         </div>
      </div>
      


    </div>
  );
}

export default Infosection;
