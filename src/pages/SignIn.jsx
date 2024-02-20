import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { signInFailure } from '../redux/user/userSlice';

function SignIn() {
  const [formData, setFormData] = useState({});
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };

  console.log(formData);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await fetch('https://ga-p4-backend.onrender.com/auth/signin',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(formData),
      }
      );  
      const data = await response.json();
      if (data.success === false) {
        // dispatch the signInFailure action here with the data.message as the payload
        dispatch(signInFailure(data.message));
        console.log(data.message);
        return;
      } else {
      dispatch(signInSuccess(data));
      // remove this console log later on
      console.log(data); 
      navigate('/'); }
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.log(error.message);
    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      
    <h1 className='text-3xl text-center font-semibold mt-4'>Sign In</h1>
    
    <form onSubmit={handleSubmit} className='flex flex-col'>

    <input 
    type="email"
    placeholder='Email'
    id='email'
    className='border p-3 rounded-lg mb-2 mt-4'
    onChange={handleChange}
    />

    <input 
    type="password"
    placeholder='Password'
    id='password'
    className='border p-3 rounded-lg mb-4'
    onChange={handleChange}
    />

    <button className='text-white p-3 bg-blue-700 rounded-lg disabled:opacity-95'>
      Sign In
    </button>
    </form>

    <div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
    
    
    </div>
  )
}

export default SignIn