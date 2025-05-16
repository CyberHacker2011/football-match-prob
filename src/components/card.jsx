import React from 'react'
import clubs from '../data/clubs.js'

function Card({club, isSelected}) {
    console.log(clubs[club]);
  return (
    <>
        <section>
            <div className={`container cursor-pointer shadow-md p-3 flex flex-col w-40 gap-3 justify-center items-center ${isSelected ? 'bg-green-300' : 'bg-white'}`}>
                <div className='relative w-full h-14'>
                    <img src={`src/assets/${club}.png`} alt={`${club} logo`} className='object-contain w-full h-full' />
                </div>
                <div>
                    <h1 className='bold text-sm font-sans'>{club.toUpperCase()}</h1>
                </div>
                <div>
                    <p className='italic text-gray-800 text-sm'>{`Rating: ${clubs[club]}`}</p>
                </div>
            </div>
        </section>
    </>
  )
}

export default Card