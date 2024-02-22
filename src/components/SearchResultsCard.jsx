import React from 'react'
import { Link } from 'react-router-dom'
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";

function SearchResultsCard({listing}) {
  return (
    <div className='bg-white mb-4 pt-2 ml-2 mr-2 pr-2 rounded-lg shadow-2xl'>
      <Link to={`/listing/${listing._id}`}>
        {/* image */}
        <img src={listing.imageURL} 
          alt={listing.name}
          className='w-40 h-40 object-cover rounded-lg ml-2 mb-2' 
        />

        {/* listing name */}
        <div className='result-card-name-container'>
        <h2 className='font-semibold ml-2 truncate'>{listing.name}</h2>
        </div>

        {/* pricing */}
        <div className="result-card-price-container ml-2">
          <p className='text-2xl font-semibold truncate'>
            ${listing.offer ? listing.discountPrice : listing.regularPrice}
            {listing.type === 'rent' && ' / month'}
          </p>
        </div>

        {/* beds and baths */}
        <div className='text-blue-700 flex flex-col ml-2 pb-2'>
          <div className='font-bold text-s'>
          <FaBed className='inline mr-1'/>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} bedrooms `
              : `${listing.bedrooms} bedroom `}
          </div>
          <div className='font-bold text-s'>
          <FaBath className='inline mr-1 mb-2'/>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} bathrooms `
              : `${listing.bathrooms} bathroom `}
          </div>
        </div>
      </Link>
    </div>
  );
}


export default SearchResultsCard