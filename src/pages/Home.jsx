import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex flex-col ml-4'>
      {/* top */}
      <div>
        <h1 className='text-4xl text-blue-700 font-bold mt-4'>Welcome</h1>
        <p className='text-2xl font-semibold mt-4'>Find your next home here.</p>
      </div>
      
      <div className='items-center'>
        <Link to='/searchresults'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4'>
            Search Our Listings
          </button>
        </Link>
      </div>
      
      
      
      {/* listing */}
    </div>
  )
}

export default Home