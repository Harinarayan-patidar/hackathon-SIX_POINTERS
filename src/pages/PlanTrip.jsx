import React, { useState, useContext } from 'react';
import { toast } from "react-hot-toast";
import { Ai_prompt } from '../options/options';
import { chatSession } from './service/GeminiAi';
import { AppContext } from "../Context/AppContext";
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

export function PlanTrip() {

  const navigate = useNavigate();
  const [tripResult, setTripResult] = useState(null);

  // State for user data including trip type, budget, and currency
  const [userData, setUserData] = useState({
    destination: '',
    from: '',
    days: '',
    travelDate: '',
    budget: '',
    currency: 'USD', // Default currency set to USD
    tripType: '', // To store the selected trip type (couple, individual, friends, parents)
  });

  const { loading, setLoading } = useContext(AppContext);
  

  // Change handler to update user data
  function changeHandler(event) {
    const { name, value } = event.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  // Function to handle selecting a trip type (couple, individual, friends, parents)
  function selectTripType(type) {
    setUserData(prev => ({
      ...prev,
      tripType: type, // Update the trip type in the state
    }));
  }

  // Submit handler to show success toast and log user data
  async function submitHandler(e){
    e.preventDefault();

    // Show success message
    toast.success("Trip is planning ");

    // Log user data (could be sent to an API or used in other ways)
    console.log(userData);

    const Final_Prompt = Ai_prompt
    .replace ('{Location}', userData?.destination)
    .replace ('{Location}', userData?.destination)
    .replace ('{Days}', userData?.days)
    .replace (' {members}', userData?.tripType)
    .replace ('{budget}', userData?.budget)
    .replace ('{currencyType}', userData?.currency)
    .replace ('{Days}', userData?.days)
   
    console.log("Final prompt:-" , Final_Prompt);

    async function fetchResult() {
      setLoading(true);
     
      try {
           
        const result = await chatSession.sendMessage(Final_Prompt); 
        console.log(result?.response?.text( )); 
   
        setTripResult(result?.response?.text());
        const tripData = JSON.parse(result?.response?.text());
          navigate("/myTrip", { state: { tripResult: tripData } });
        // navigate("/myTrip", { state: { tripResult: result?.response?.text() } });
        
      } catch (err) {
        console.log(err);
       }
      

      setLoading(false);
    }

    fetchResult()
    // const result = await chatSession.sendMessage(Final_Prompt); 
   

    // try {
    //     const response = await fetch('http://localhost:5000/trips', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(tripData),
    //     });
  
    //     if (response.ok) {
    //       console.log('Trip data saved successfully!');
    //     } else {
    //       console.error('Failed to save trip data.');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }



  }

  return (
    <div className="py-8 w-11/12 mx-auto text-black bg-gray-100 rounded-lg shadow-md">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6">Enter Trip Details</h1>

      {/* Input for Destination */}
      <div className="flex flex-col py-4 text-black w-[70%] flex ">
        <label className="mb-2 font-semibold">Going to:</label>
        <input
          type="text"
          name="destination"
          value={userData.destination}
          onChange={changeHandler}
          placeholder="Destination to..."
          required
          className="px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Input for From */}
      <div className="flex flex-col py-4 text-black">
        <label className="mb-2 font-semibold">Going from:</label>
        <input
          type="text"
          name="from"
          value={userData.from}
          onChange={changeHandler}
          placeholder="From..."
          required
          className="px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Number of Days and Travel Date Inputs */}
      <div className="flex flex-col py-6 my-4">
        <label className="mb-2 font-semibold">Enter no. of days:</label>
        <input
          type="text"
          name="days"
          value={userData.days}
          onChange={changeHandler}
          placeholder="Enter number of days"
          className="px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="my-4 mb-2 font-semibold">Enter Date of travel:</label>
        <input
          className="text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          name="travelDate"
          value={userData.travelDate}
          onChange={changeHandler}
        />
      </div>

      {/* Input for Trip Budget */}
      <div className="flex flex-col py-4 text-black">
        <label className="mb-2 font-semibold">Enter Trip Budget:</label>
        <input
          type="number"
          name="budget"
          value={userData.budget}
          onChange={changeHandler}
          placeholder="Enter budget for the trip"
          required
          className="px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Input for Currency Selection */}
      <div className="flex flex-col py-4 text-black">
        <label className="mb-2 font-semibold">Select Currency:</label>
        <select
          name="currency"
          value={userData.currency}
          onChange={changeHandler}
          className="px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="USD">$ (USD)</option>
          <option value="INR">₹ (INR)</option>
          <option value="EUR">€ (EUR)</option>
          <option value="GBP">£ (GBP)</option>
          <option value="AUD">A$ (AUD)</option>
          <option value="CAD">C$ (CAD)</option>
          {/* Add more currencies as needed */}
        </select>
      </div>

      {/* Trip Type Cards */}
      <div className="flex justify-between mt-6 mb-4 px-3 mx-3 gap-3">
        {/* Couple Card */}
        <div
          onClick={() => selectTripType('Couple')}
          className={`w-1/4 p-4 cursor-pointer bg-white rounded-lg text-center ${userData.tripType === 'Couple' ? 'border-4 border-blue-500' : ''}`}
        >
          <h3 className="text-xl font-semibold">Couple</h3>
          <p className="mt-2 text-sm">Plan a romantic getaway</p>
        </div>

        {/* Individual Card */}
        <div
          onClick={() => selectTripType('Individual')}
          className={`w-1/4 p-4 cursor-pointer bg-white rounded-lg text-center ${userData.tripType === 'Individual' ? 'border-4 border-blue-500' : ''}`}
        >
          <h3 className="text-xl font-semibold">Individual</h3>
          <p className="mt-2 text-sm">Solo trip to explore</p>
        </div>

        {/* Friends Card */}
        <div
          onClick={() => selectTripType('Friends')}
          className={`w-1/4 p-4 cursor-pointer bg-white rounded-lg text-center ${userData.tripType === 'Friends' ? 'border-4 border-blue-500' : ''}`}
        >
          <h3 className="text-xl font-semibold">Friends</h3>
          <p className="mt-2 text-sm">Fun trip with friends</p>
        </div>

        {/* Parents Card */}
        <div
          onClick={() => selectTripType('Parents')}
          className={`w-1/4 p-4 cursor-pointer bg-white rounded-lg text-center ${userData.tripType === 'Parents' ? 'border-4 border-blue-500' : ''}`}
        >
          <h3 className="text-xl font-semibold">Parents</h3>
          <p className="mt-2 text-sm">Family trip with parents</p>
        </div>
      </div>

      {/* Generate Trip Plan Button */}
      <button
        onClick={submitHandler}
        className="bg-blue-500 text-black py-2 px-6 rounded-lg mt-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Generate Trip Plan
      </button>

       {/* Spinner while loading */}
       {loading && (
        <div className="flex justify-center items-center absolute inset-0 bg-white bg-opacity-50 z-10">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-white rounded-full" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
