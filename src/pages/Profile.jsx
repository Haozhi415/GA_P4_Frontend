import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { updateUserSuccess } from '../redux/user/userSlice';
import { updateUserFailure } from '../redux/user/userSlice';
import { deleteUserSuccess } from '../redux/user/userSlice';
import { deleteUserFailure } from '../redux/user/userSlice';
import { signOutUserSuccess } from '../redux/user/userSlice';
import { signOutUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Profile() {

  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListing, setUserListing] = useState([]);
  console.log(formData);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await fetch(`https://ga-p4-backend.onrender.com/user/update/${currentUser._id}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        console.log(data.message);
        return;
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
        console.log(data);
      }

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`https://ga-p4-backend.onrender.com/user/delete/${currentUser._id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Credentials": true,
        },
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        console.log(data.message);
        return;
      } else {
        dispatch(deleteUserSuccess(data));
        console.log(data);
      }

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch(`https://ga-p4-backend.onrender.com/auth/signout`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Credentials": true,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        console.log(data.message);
        return;
      } else {
        dispatch(signOutUserSuccess(data));
        console.log(data);
      }
      
    } catch (error) {
      console.log(error.message);
    }
  
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const response = await fetch(`https://ga-p4-backend.onrender.com/user/listings/${currentUser._id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Credentials": true,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        setShowListingError(true);
        console.log(data.message);
        return;
      } else {      
        console.log(data);
        setUserListing(data);
      }
    } catch (error) {
      setShowListingError(true);
    }

  };

  const handleDeleteListing = async (listingId) => {
    try {
      const response = await fetch(`https://ga-p4-backend.onrender.com/listing/delete/${listingId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Credentials": true,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        console.log(data.message);
        return;
      } else {      
        console.log(data);
        setUserListing((prev) => prev.filter((listing) => listing._id !== listingId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };







  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-bold text-center mt-4'>Profile</h1>

    <form onSubmit={handleSubmit} className='flex flex-col'>

    <input 
    type="text"
    placeholder='Username'
    id='username'
    defaultValue={currentUser.username}
    onChange={handleChange}
    className='border p-3 rounded-lg mb-2 mt-4'
    />

    <input 
    type="email"
    placeholder='Email'
    id='email'
    defaultValue={currentUser.email}
    onChange={handleChange}
    className='border p-3 rounded-lg mb-2'
    />

    <input 
    type="password"
    placeholder='Password'
    id='password'
    onChange={handleChange}
    className='border p-3 rounded-lg mb-4'
    />

    <button className='text-white p-3 bg-blue-700 rounded-lg disabled:opacity-95'>
      Update
    </button>

    <Link className='text-white p-3 bg-blue-700 rounded-lg text-center mt-3 disabled:opacity-95' to={"/create-listing"}>
      Create Listing
    </Link>

    </form>

    

    <div className='flex justify-between mt-4'>
      <button onClick={handleDeleteUser} className='text-white font-semibold p-3 bg-red-600 rounded-lg disabled:opacity-95'>
        DELETE ACCOUNT
      </button>
      <button onClick={handleSignOut} className='text-white p-3 bg-blue-700 rounded-lg disabled:opacity-95'>
        Sign Out
      </button>
    </div>

    <p className='text-center mt-4 text-green-500'>{updateSuccess && 'Profile updated successfully!'}</p>

    <button onClick={handleShowListing} className='text-white p-3 bg-green-600 rounded-lg disabled:opacity-95 w-full'>
      View my listings
    </button>
    
    <p className='text-center mt-4 text-red-500'>{showListingError ? 'Error fetching listings' : ''}</p>

    {userListing && userListing.length > 0 && userListing.map((listing) => (
        <div className='border rounded-lg p-3 flex justify-between items-center mb-4' key={listing._id}>
          <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageURL} alt='listing image' className='w-20 h-20 object-contain'/>
          </Link>
          <Link to={`/listing/${listing._id}`} className='text-center hover:underline truncate flex-1'>
            <p>{listing.name}</p>
          </Link>

          <div className='flex flex-col'>
            <button onClick={()=>handleDeleteListing(listing._id)} className='text-red-600'>DELETE</button>
            <Link to={`/update-listing/${listing._id}`}>
            <button className=''>Edit</button>
            </Link>
          </div>
        </div>
      ))
    }
    </div>
  )
}

export default Profile