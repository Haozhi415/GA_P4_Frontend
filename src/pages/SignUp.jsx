import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      const response = await fetch('https://ga-p4-backend.onrender.com/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
      );  
      const data = await response.json();
      if (data.success === false) {
        setError(data.message);
        return;
      } else {
      setError(null);
      console.log(data);
      navigate('/signin'); }
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      
    <h1 className='text-3xl text-center font-semibold mt-4'>SignUp</h1>
    
    <form onSubmit={handleSubmit} className='flex flex-col'>
    <input 
    type="text"
    placeholder='Username'
    id='username'
    className='border p-3 rounded-lg mb-2 mt-4'
    onChange={handleChange}
    />

    <input 
    type="email"
    placeholder='Email'
    id='email'
    className='border p-3 rounded-lg mb-2'
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
      Sign Up
    </button>
    </form>

    <div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
    
    
    </div>
  )
}

export default SignUp