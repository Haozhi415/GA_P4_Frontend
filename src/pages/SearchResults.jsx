import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchResultsCard from "../components/SearchResultsCard";

function SearchResults() {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "both",
    parking: false,
    furnished: false,
    offer: false,
  });

  const [listings, setListings] = useState([]);

  const navigate = useNavigate();

  console.log(sideBarData);

  // retrieves the search parameters from the URL using URLSearchParams,
  // updates the sideBarData state with the retrieved parameters,
  // and fetches the listings data from the server based on the search criteria.
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlSearchTerm = urlParams.get("searchTerm");
    const urlType = urlParams.get("type");
    const urlParking = urlParams.get("parking");
    const urlFurnished = urlParams.get("furnished");
    const urlOffer = urlParams.get("offer");

    if (urlSearchTerm || urlType || urlParking || urlFurnished || urlOffer) {
      setSideBarData({
        searchTerm: urlSearchTerm || "",
        type: urlType || "both",
        parking: urlParking === "true" ? true : false,
        furnished: urlFurnished === "true" ? true : false,
        offer: urlOffer === "true" ? true : false,
      });
    }

    const fetchListings = async () => {
      const searchQuery = urlParams.toString();
      const response = await fetch(
        `https://ga-p4-backend.onrender.com/listing/getAll?${searchQuery}`
      );
      const data = await response.json();
      setListings(data);
      console.log(data);
    };

    fetchListings();
  }, [location.search]);
  // For example, if your URL is http://example.com/search?query=test, location.search would return ?query=test.

  const handleChange = (evt) => {
    if (evt.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: evt.target.value });
    }

    if (
      evt.target.id === "both" ||
      evt.target.id === "rent" ||
      evt.target.id === "sale"
    ) {
      setSideBarData({ ...sideBarData, type: evt.target.id });
    }

    if (
      evt.target.id === "parking" ||
      evt.target.id === "furnished" ||
      evt.target.id === "offer"
    ) {
      setSideBarData({
        ...sideBarData,
        [evt.target.id]:
          evt.target.checked || evt.target.checked === "true" ? true : false,
      });
    }
  };

  // constructs the search query parameters based on the current state of sideBarData.
  // creates a new instance of URLSearchParams called urlParams to manage the URL query parameters.
  // then sets the search term, type, parking, furnished, and offer parameters in the urlParams object
  // using the set method.
  // lastly converts the urlParams object to a string representation of the query parameters using the
  // toString method. This string will be appended to the URL as the search query.
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("type", sideBarData.type);
    urlParams.set("parking", sideBarData.parking);
    urlParams.set("furnished", sideBarData.furnished);
    urlParams.set("offer", sideBarData.offer);

    const searchQuery = urlParams.toString();
    navigate(`/searchresults?${searchQuery}`);
  };

  return (
    <div className="flex bg-slate-200 flex-row pl-4 pt-4 min-h-screen">
      <div className="pr-10">
        <form onSubmit={handleSubmit}>
          {/* Search term */}
          <div className="flex flex-col mb-4">
            <p className="text-blue-800 font-semibold">Search Term: </p>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={sideBarData.searchTerm}
              onChange={handleChange}
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>

          {/* Type */}
          <div className="text-blue-800">
            <p className="font-semibold">Type: </p>
            <div className="mb-4">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  id="both"
                  className="mr-1 w-5 h-5"
                  onChange={handleChange}
                  checked={sideBarData.type === "both"}
                />
                <p>Rent and Sale</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  id="rent"
                  className="mr-1 w-5 h-5"
                  onChange={handleChange}
                  checked={sideBarData.type === "rent"}
                />
                <p>Rent</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  id="sale"
                  className="mr-1 w-5 h-5"
                  onChange={handleChange}
                  checked={sideBarData.type === "sale"}
                />
                <p>Sale</p>
              </div>
            </div>

            <div className="mb-4">
            <p className="font-semibold">Discount: </p>
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  id="offer"
                  className="mr-1 w-5 h-5"
                  onChange={handleChange}
                  checked={sideBarData.offer}
                />
                <p>Offer</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="text-blue-800">
            <p className="font-semibold">Amenities: </p>
            <div className="mb-4">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  id="parking"
                  className="mr-1 w-5 h-5"
                  onChange={handleChange}
                  checked={sideBarData.parking}
                />
                <p>Parking</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  className="mr-1 w-5 h-5"
                  onChange={handleChange}
                  checked={sideBarData.furnished}
                />
                <p>Furnished</p>
              </div>
            </div>
          </div>

          <button className="btn btn-accent">
            SEARCH
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-blue-800 font-semibold text-2xl mb-2">Search Results:</h1>
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
  );
}

export default SearchResults;
