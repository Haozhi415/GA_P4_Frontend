import React from 'react'
import { Link } from 'react-router-dom'

function SearchResultsCard({listing}) {
  return (
    <div className='bg-white mb-4 pt-2 ml-2 pr-2 shadow-lg rounded-lg'>
        <Link to={`/listing/${listing._id}`}>
            {/* image */}
            <img src={listing.imageURL} 
            alt={listing.name}
            className='w-64 h-64 object-cover rounded-lg ml-2 mb-2' 
            />

            {/* listing name */}
            <h2 className='text-xl font-semibold ml-2 pb-2 truncate'>{listing.name}</h2>

            {/* pricing */}
            <p>
              ${listing.offer ? listing.discountPrice : listing.regularPrice}
              {listing.type === 'rent' && ' / month'}
            </p>

            {/* beds and baths */}
            <div className='text-blue-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} bedrooms `
                : `${listing.bedrooms} bedroom `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms `
                : `${listing.bathrooms} bathroom `}
            </div>
            </div>
        </Link>
    </div>
  )
}

export default SearchResultsCard