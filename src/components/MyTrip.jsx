import React from 'react';
import { useLocation } from 'react-router-dom';
import Infosection from '../pages/Infosection';
import Hotel from '../pages/Hotel';
import Card from './Card';

export function MyTrip() {
  const location = useLocation();
  let tripResult = location.state?.tripResult; // Accessing tripResult from the state passed

  // Check if tripResult is a string and parse it to an object
  if (typeof tripResult === 'string') {
    try {
      tripResult = JSON.parse(tripResult); // Parse string to JSON
    } catch (e) {
      console.error("Error parsing trip data:", e);
      tripResult = null; // If parsing fails, set tripResult to null
    }
  }

  console.log("Trip result:", tripResult);

  // Map the itinerary data into an array of days
  const itineraryDays = Object.entries(tripResult?.itinerary || {}); // Converts {day_1: {...}, day_2: {...}} to [["day_1", {...}], ["day_2", {...}]]
  
  return (
    <div className="py-8 absolute h-full w-full mx-auto text-white bg-white rounded-lg shadow-md">
      {/* Information section */}
      <Infosection trip={tripResult} />
      {/* Recommended hotels */}
      <Hotel trip={tripResult} />
      {/* Daily plan */}
      <div className='text-black'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-3 items-center gap-3 justify-center'>
          {itineraryDays.length > 0 ? (
            itineraryDays.map(([day, dayPlan], index) => (
              <div key={index}>
                <Card 
                  day={day} 
                  dayPlan={dayPlan} 
                />
              </div>
            ))
          ) : (
            <p>No visiting places available</p>
          )}
        </div>
      </div>
    </div>
  );
}
