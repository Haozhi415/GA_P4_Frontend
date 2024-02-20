import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {

  const { currentUser } = useSelector(state => state.user);

  return (
    <header className='bg-blue-200 shadow-md'>
        <div className='flex justify-between p-3 items-center'>

        {/* Left */}
        <Link to="/">
        <h1 className='font-bold flex ml-2'>
            <span className='text-blue-700'>Home</span>
            <span className='text-blue-700'>Harbor</span>
        </h1>
        </Link>


        {/* Right */}
        <ul className='flex'>
          <Link to="/">
          <li className='ml-4 hover:underline'>Homepage</li>
          </Link>

          <Link to="/searchresults">
          <li className='ml-4 hover:underline'>Search</li>
          </Link>

          {currentUser && currentUser.isAdmin && (
          <Link to={'/admin'} className='ml-4 hover:underline'>
          Admin Panel
          </Link>
          )} 

          <Link to='/profile'>
          {currentUser ? <li className=' ml-3 hover:underline'>User Profile</li> : (
          <li className='ml-4 hover:underline'> Sign in</li>
          )}
          </Link>

          {!currentUser && (
          <Link to="/signup">
          <li className='ml-4 hover:underline'>Sign Up</li>
          </Link>
          )}
        </ul>

        </div>
    </header>
  )
}

export default Header