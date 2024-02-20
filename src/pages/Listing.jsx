import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const [contact, setContact] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId;
            console.log(listingId);
            const response = await fetch(`https://ga-p4-backend.onrender.com/listing/get/${listingId}`);
            const data = await response.json();
            console.log(data);
            setListing(data);
        };

        fetchListing();
    }, [params.listingId]);


return (
    <div>
        {listing && (
            <>
                <p className='text-2xl font-semibold'>
                    Name: {listing.name}
                </p>

                <p className='text-2xl font-semibold'>
                    Address: {listing.address}
                </p>

                <p className='text-2xl text-red-700 font-semibold'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>

                <p className='text-2xl font-semibold'>
                    Price: ${listing.offer
                        ? listing.discountPrice
                        : listing.regularPrice}
                    {listing.type === 'rent' && ' / month'}
                </p>

                {listing.offer && (
                <div className='flex flex-col text-2xl font-semibold'>
                  <p>Regular Price: ${listing.regularPrice} {listing.type === 'rent' && ' / month'}</p>
                  <p className='text-green-600'>${+listing.regularPrice - +listing.discountPrice} OFF</p>
                </div>
                )}

                <p className='text-2xl font-semibold'>
                    Description: {listing.description}
                </p>

                <ul className='text-blue-700 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms `
                  : `${listing.bedrooms} Bedroom `}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms `
                  : `${listing.bathrooms} Bathroom `}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.parking ? 'Parking spot' : 'No Parking'}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
                </ul>

                {currentUser && listing.userRef !== currentUser._id && !contact && (
                <button
                onClick={() => setContact(true)}
                className='bg-blue-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
                >
                Email Seller
                </button>  
                )}

                {contact && <Contact listing={listing} />}
            </>
        )}
    </div>
);

};

export default Listing