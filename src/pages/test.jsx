import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import SearchResultsCard from '../components/SearchResultsCard';

function test() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    
    const fetchListings = async () => {
      const response = await fetch("https://ga-p4-backend.onrender.com/listing/getAll?offer=true");
      const data = await response.json();
      
      // Show only the first 4 results if there are more
      const slicedData = data.slice(0, 4);
  
      setListings(slicedData);
      console.log(slicedData);
    };
  
    fetchListings();
  }, []); // Run once when the page loads
  
  return (
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
  )
}

export default test