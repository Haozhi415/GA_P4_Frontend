import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    imageURL: "",
    offer: false,
    parking: false,
    furnished: false,
  });

  const [error, setError] = useState(false);

  console.log(formData);

  const handleChange = (evt) => {
    if (evt.target.id === "sale" || evt.target.id === "rent") {
      setFormData({
        ...formData,
        type: evt.target.id,
      });
    }

    if (
      evt.target.id === "parking" ||
      evt.target.id === "furnished" ||
      evt.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [evt.target.id]: evt.target.checked,
      });
    }

    if (
      evt.target.type === "number" ||
      evt.target.type === "text" ||
      evt.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [evt.target.id]: evt.target.value,
      });
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      if (formData.discountPrice > formData.regularPrice) {
        setError("Discounted price cannot be greater than regular price");
        return;
      }

      setError(false);

      const response = await fetch("https://ga-p4-backend.onrender.com/listing/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success === false) {
        setError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main>
      <h1 className="text-blue-700 text-3xl font-bold text-center mt-4">
        Create a listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Name"
          id="name"
          onChange={handleChange}
          value={formData.name}
          required
          className="border p-3 rounded-lg mb-2 mt-4"
        />

        <textarea
          rows="10"
          placeholder="Description"
          id="description"
          onChange={handleChange}
          value={formData.description}
          required
          className="border p-3 rounded-lg mb-2 mt-4"
        />

        <textarea
          rows="6"
          placeholder="Address"
          id="address"
          onChange={handleChange}
          value={formData.address}
          required
          className="border p-3 rounded-lg mb-2 mt-4"
        />

        {/* checkbox div */}
        <div className="flex flex-row flex-wrap mt-4 mb-4">
          <div className="flex">
            <input
              type="checkbox"
              id="sale"
              onChange={handleChange}
              checked={formData.type === "sale"}
              className="w-5"
            />
            <span className="ml-1 mr-4">Sell</span>
          </div>

          <div className="flex">
            <input
              type="checkbox"
              id="rent"
              onChange={handleChange}
              checked={formData.type === "rent"}
              className="w-5"
            />
            <span className="ml-1 mr-4">Rent</span>
          </div>

          <div className="flex">
            <input
              type="checkbox"
              id="parking"
              onChange={handleChange}
              checked={formData.parking}
              className="w-5"
            />
            <span className="ml-1 mr-4">Parking</span>
          </div>

          <div className="flex">
            <input
              type="checkbox"
              id="furnished"
              onChange={handleChange}
              checked={formData.furnished}
              className="w-5"
            />
            <span className="ml-1 mr-4">Furnished</span>
          </div>

          <div className="flex">
            <input
              type="checkbox"
              id="offer"
              onChange={handleChange}
              checked={formData.offer}
              className="w-5"
            />
            <span className="ml-1 mr-4">Offer</span>
          </div>
        </div>

        {/* beds bath div */}
        <div className="flex flex-row">
          <div>
            <input
              type="number"
              id="bedrooms"
              min="1"
              max="10"
              onChange={handleChange}
              value={formData.bedrooms}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
            <span className="ml-1 mr-4">Bedrooms</span>
          </div>

          <div>
            <input
              type="number"
              id="bathrooms"
              min="1"
              max="10"
              onChange={handleChange}
              value={formData.bathrooms}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
            <span className="ml-1 mr-4">Bathrooms</span>
          </div>
        </div>

        {/* price div */}
        <div className="flex flex-col mb-4 mt-4">
          <div className="flex flex-row">
            <input
              type="number"
              id="regularPrice"
              min="50"
              max="5000000"
              onChange={handleChange}
              value={formData.regularPrice}
              className="p-3 border border-gray-300 rounded-lg"
              required
            />

            <div className="flex flex-col ml-1">
              <span className="ml-1 mr-1">Regular price</span>
              {formData.type === "rent" && (
                <span className="text-xs ml-1">($ / month)</span>
              )}
            </div>
          </div>

          {/* only renders discountPrice if offer is checked. */}
          {formData.offer && (
            <div className="flex flex-row">
              <input
                type="number"
                id="discountPrice"
                min="0"
                max="5000000"
                onChange={handleChange}
                value={formData.discountPrice}
                className="p-3 border border-gray-300 rounded-lg"
                required
              />
              <div className="flex flex-col ml-1">
                <span className="ml-1 mr-1">Discount price</span>
                {formData.type === "rent" && (
                  <span className="text-xs ml-1">($ / month)</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* img div */}
        <input
          type="text"
          placeholder="Image URL"
          id="imageURL"
          onChange={handleChange}
          value={formData.imageURL}
          required
          className="border p-3 rounded-lg mb-2 mt-4"
        />

        {/* create listing button */}
        <button className="text-white p-3 bg-blue-700 rounded-lg disabled:opacity-95 mb-4">
          Create Listing
        </button>

        {/* error message */}
        {error && <p className="text-red-700 mb-4">{error}</p>}
      </form>
    </main>
  );
}

export default CreateListing;
