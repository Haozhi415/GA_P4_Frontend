import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [seller, setSeller] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (evt) => {
    setMessage(evt.target.value);
  };
  console.log(message);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await fetch(
          `https://ga-p4-backend.onrender.com/user/get/${listing.userRef}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setSeller(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSeller();
  }, [listing.userRef]);

  return (
    <>
      {seller && (
        <div className="flex flex-col">
          <p className="font-semibold mb-2">
            Reach out to <span>{seller.username}</span> for enquiry about{" "}
            <span>{listing.name}.</span>
          </p>
          <textarea
            rows="10"
            placeholder="Enter your message here..."
            name="message"
            id="message"
            value={message}
            onChange={handleChange}
            className="w-1/2 border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${seller.email}?subject=Regarding ${listing.name}&body=${message}`}
          >
            <button className="btn btn-accent mt-2">Send Your Message</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
