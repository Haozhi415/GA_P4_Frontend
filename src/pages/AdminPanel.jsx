import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

function AdminPanel() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListing = async () => {
            const response = await fetch('https://ga-p4-backend.onrender.com/listing/getAll');
            const data = await response.json();
            console.log(data);
            setListings(data);
        };

        fetchListing();
    }, []);

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
          setListings((prev) => prev.filter((listing) => listing._id !== listingId));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
  return (
    <div>
    <h1 className='text-3xl font-bold text-center mt-4'>Admin Panel</h1>

    <div>
    {listings && listings.length > 0 && listings.map((listing) => (
        <div className='border rounded-lg p-3 flex justify-between items-center mb-4' key={listing._id}>
          <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageURL} alt='listing image' className='w-20 h-20 object-contain'/>
          </Link>
          <Link to={`/listing/${listing._id}`} className='text-center hover:underline truncate flex-1'>
            <p>{listing.name}</p>
          </Link>

          <div className='flex flex-col'>
            <button onClick={()=>handleDeleteListing(listing._id)} className='text-red-600'>DELETE</button>
          </div>
        </div>
      ))
    }
    </div>
    </div>
  )
}

export default AdminPanel