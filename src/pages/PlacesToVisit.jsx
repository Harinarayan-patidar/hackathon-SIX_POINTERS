
import React from 'react'

function PlacesToVisit() {
  return (
    
       <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-3 items-center gap-3 justify-center'>
        {
          // Ensure hotel_options exists and is an array before mapping over it
          trip?.hotel_options?.length > 0 ? (
            trip?.hotel_options?.map((hotel, index) => (
                <Link 
                to={`https://www.google.com/maps/@ ${hotel.geo_coordinates.latitude},${hotel.geo_coordinates.longitude},7.5z?entry=ttu&g_ep=EgoyMDI1MDIxOC4wIKXMDSoASAFQAw%3D%3D`} 
                target='_blank'
              >
              <div key={index}  className='w-[300px] h-fit border hover:scale-105 transition-all cursor-pointer border-b-richblack-800 bg-slate-100 gap-4 flex flex-col '>
                  <img src={placeholderImage} className='rounded-lg'></img>
                  <div className='gap-2 flex flex-col'> 
                    <h2 className='font-medium  '>{hotel?.hotel_name}</h2>
                    <h2 className='font-medium text-gray-600 '>📍{hotel?.hotel_address}</h2>
                    <h2 className='font-medium text-gray-800 '>🏷️{hotel?.price_range}</h2>
                    <h2 className='font-medium text-gray-800 '>⭐{hotel?.rating}</h2>
                    
                  </div>
              </div>
             </Link>
            ))
          ) : (
            <p>No hotel options available</p>
          )
        }
      </div>

   
     
   
    
    
  )
}

export default PlacesToVisit
