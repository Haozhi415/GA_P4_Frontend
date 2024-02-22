import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import SearchResultsCard from '../components/SearchResultsCard';

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    
    const fetchListings = async () => {
      const response = await fetch("https://ga-p4-backend.onrender.com/listing/getAll?offer=true");
      const data = await response.json();
      
      // Show only the first 4 results if there are more
      const slicedData = data.slice(0, 6);
  
      setListings(slicedData);
      console.log(slicedData);
    };
  
    fetchListings();
  }, []); // Run once when the page loads

  return (
    <div className='flex flex-col min-h-screen' style={{ 
      backgroundImage: `url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.keyrealestates.com%2Fcms%2Fwp-content%2Fuploads%2F2018%2F10%2Fmarbella-luxury-villas-for-sale-1920x1281.jpg&f=1&nofb=1&ipt=563a5ab571ba2903ddb3a0d28b290d40e547c866bc4995507d18ea9f62c4e16c&ipo=images')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
    
      {/* top */}
      <div className='flex flex-col'>
        <div className='flex flex-row'>
        <h1 className='text-5xl text-white font-bold mt-4 ml-4'>Welcome to</h1>
        <h1 className='text-5xl text-cyan-400 font-bold mt-4 ml-2'>Home</h1>
        <h1 className='text-5xl text-blue-800 font-bold mt-4'>Harbor</h1>
        </div>
        <p className=' text-white mt-4 ml-4 pb-5'>
        Your gateway to discovering the perfect property. Dive into our curated selection of homes, apartments, and villas, tailored to meet your unique needs and preferences.
        </p>
      </div>
      
      <div className='items-center'>
        <Link to='/searchresults'>
          <button className='btn btn-accent font-bold text-xl py-2 px-4 mt-4 ml-4'>
            Explore Our Listings
          </button>
        </Link>
      </div>
      
      
      
      {/* listing */}
      <p className='text-white text-xl font-semibold mt-4 ml-4 mb-2'>Our Hot Offers:</p>
      <div>
        <div className="flex flex-wrap">
          {listings.length === 0 && (
            <p className="text-blue-800 text-xl mt-2">No listings found.</p>
          )}

          
          {listings &&
            listings.map((listing) => (
              
              <SearchResultsCard key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home