import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch(
        "https://ga-p4-backend.onrender.com/listing/getAll?offer=true"
      );
      const data = await response.json();

      // Show only the first 4 results if there are more
      const slicedData = data.slice(0, 6);

      setListings(slicedData);
      console.log(slicedData);
    };

    fetchListings();
  }, []); // Run once when the page loads

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblueskyluxurytravels.com%2Fvillas%2Fbvi%2Fthe-beach-house%2Ffiles%2F001bvi21.jpg&f=1&nofb=1&ipt=89a81ac165867dee70c9fbd9014865a36baf5dced971e5139cd423141cb08137&ipo=images')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity level (0.5 in this example)
      }}
    >
      {/* top */}
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h1 className="text-5xl text-white font-bold mt-4 ml-4">
            Welcome to
          </h1>
          <h1 className="text-5xl text-cyan-400 font-bold mt-4 ml-2">Home</h1>
          <h1 className="text-5xl text-blue-800 font-bold mt-4">Harbor</h1>
        </div>
        <p className=" text-blue-700 mt-4 ml-4 pb-5">
          Your gateway to discovering the perfect property. Dive into our
          curated selection of homes, apartments, and villas, tailored to meet
          your unique needs and preferences.
        </p>
      </div>

      <div className="items-center">
        <Link to="/searchresults">
          <button className="btn btn-accent font-bold text-xl py-2 px-4 mt-4 ml-4">
            Explore Our Listings
          </button>
        </Link>
      </div>

      {/* listing */}
      <p className="text-white text-xl font-semibold mt-4 ml-4 mb-2">
        Our Hot Offers:
      </p>
      <div>
        <div className="flex flex-wrap">
          {listings.length === 0 && (
            <p className="text-white text-xl ml-4 mt-2">No listings found.</p>
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

export default Home;
