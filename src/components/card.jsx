import React from 'react';
import clubs from '../data/clubs.js';

function Card({ club, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition duration-200 ease-in-out rounded-2xl p-4 w-36 sm:w-40 shadow-md hover:scale-105 flex flex-col items-center gap-2 ${
        isSelected ? 'bg-green-300 border-2 border-green-600' : 'bg-white'
      }`}
    >
      <div className="w-16 h-16">
        <img
          src={`src/assets/${club}.png`}
          alt={`${club} logo`}
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className="font-semibold text-center text-sm">{club.toUpperCase()}</h1>
      <p className="text-xs italic text-gray-700 text-center">{`Rating: ${clubs[club]}`}</p>
    </div>
  );
}

export default Card;
