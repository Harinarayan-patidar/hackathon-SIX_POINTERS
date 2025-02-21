import React from 'react';
import imageCard from '../assets/hp.jpg'

const Card = ({ day, dayPlan }) => {
  return (
    <div className="card p-4 bg-cyan-100 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-bold mb-2">{day}</h2>
      <h3 className="text-lg text-gray-700">{dayPlan.theme}</h3>

      <div className="activities mt-4">
        {dayPlan.activities?.length > 0 ? (
          dayPlan.activities.map((activity, index) => (
            <div key={index} className="activity-card p-3 bg-white rounded-lg shadow-sm mb-4">
              <img src={imageCard} alt={activity.place_name} className="w-full h-40 object-cover rounded-md mb-2" />
              <h4 className="font-semibold text-lg">{activity.place_name}</h4>
              <p className="text-sm text-gray-600">{activity.place}</p>
              <p className="text-sm text-gray-800">{activity.details}</p>
              <p className="text-sm text-gray-800"> ticket price:-{activity.ticket_pricing}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{activity.rating}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No activities planned for this day.</p>
        )}
      </div>
    </div>
  );
};

export default Card;
