import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaCouch } from "react-icons/fa";

function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      console.log(listingId);
      const response = await fetch(
        `https://ga-p4-backend.onrender.com/listing/get/${listingId}`
      );
      const data = await response.json();
      console.log(data);
      setListing(data);
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <div className="bg-slate-200 min-h-screen pl-4">
      {listing && (
        <div className="flex flex-row">
          {/* Left */}
          <div className="w-1/2 mt-4">
            <p className="text-slate-700 text-3xl font-semibold mb-4 block break-words">
              {listing.name}
            </p>

            <div className="text-slate-700 flex flex-col">
              <div className="">
                <p className="text-xl font-semibold">Address:</p>
              </div>
              <p className="mb-4 block break-words">{listing.address}</p>
            </div>

            <p className="text-2xl text-blue-700 font-semibold">
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </p>

            <p className="text-slate-700 text-xl font-semibold">
              Price: $
              {listing.offer ? listing.discountPrice : listing.regularPrice}
              {listing.type === "rent" && " / month"}
            </p>

            {listing.offer && (
              <div className="flex flex-col text-slate-700 text-xl font-semibold">
                <p>
                  Regular Price: ${listing.regularPrice}{" "}
                  {listing.type === "rent" && " / month"}
                </p>
                <p className="text-green-500 text-3xl mb-4">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              </div>
            )}

            <div className="flex flex-col">
              <p className="text-slate-700 text-xl font-semibold">
                Description:
              </p>
              <p className="text-slate-700 mb-4 block break-words">
                {listing.description}
              </p>
            </div>

            <ul className="text-slate-700 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mb-4">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms `
                  : `${listing.bedrooms} Bedroom `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms `
                  : `${listing.bathrooms} Bathroom `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaCar />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaCouch />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            <div className="pb-4">
              {(!currentUser ||
                (currentUser && listing.userRef !== currentUser._id)) &&
                !contact && (
                  <div>
                    <p className="text-blue-700 text-xl font-semibold mb-2">
                      Interested? Contact the seller NOW!
                    </p>
                    <button
                      onClick={() => setContact(true)}
                      className="btn btn-accent"
                    >
                      Email Seller
                    </button>
                  </div>
                )}
            </div>

            {contact && <Contact listing={listing} />}
          </div>

          {/* Right */}
          <div className="w-1/2 flex flex-col mt-4 ml-5">
            <img
              src={listing.imageURL}
              alt="listing image"
              className="w-3/4 h-3/4 object-contain mb-2 mt-2 border rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
