import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {

  const { currentUser } = useSelector(state => state.user);

  return (
    <header className='bg-white shadow-md pb-2 pt-2'>
        <div className='flex justify-between p-3 items-center'>

        {/* Left */}
        <Link to="/">
        <h1 className='font-bold flex ml-2'>
            <span className='text-cyan-400 text-2xl'>Home</span>
            <span className='text-blue-800 text-2xl'>Harbor</span>
        </h1>
        </Link>


        {/* Right */}
        <div className='flex'>
          <Link to="/">
          <button className='ml-4 btn btn-outline btn-primary'>Homepage</button>
          </Link>

          <Link to="/searchresults">
          <button className=' ml-4 btn btn-outline btn-primary'>Search</button>
          </Link>

          {currentUser && currentUser.isAdmin && (
          <Link to={'/admin'} className=' ml-4 btn btn-outline btn-primary'>
          Admin Panel
          </Link>
          )} 

          <Link to='/profile'>
          {currentUser ? <button className=' ml-3 btn btn-outline btn-primary'>User Profile</button> : (
          <button className='ml-4 btn btn-outline btn-primary'> Sign in</button>
          )}
          </Link>

          {!currentUser && (
          <Link to="/signup">
          <button className=' ml-4 btn btn-outline btn-primary'>Sign Up</button>
          </Link>
          )}
        </div>

        </div>
    </header>
  )
}

export default Header