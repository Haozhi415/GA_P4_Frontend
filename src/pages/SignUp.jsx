import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };

  console.log(formData);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data.message);
        return;
      } else {
        setError(null);
        console.log(data);
        navigate("/signin");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto min-h-screen">
      <h1 className="text-blue-700 text-3xl text-center font-semibold mt-4 mb-2">
        SignUp
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="input input-bordered input-primary w-full mt-2 mb-2"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          className="input input-bordered input-primary w-full mb-2"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          className="input input-bordered input-primary w-full mb-2"
          onChange={handleChange}
        />

        <button className="btn btn-primary">Sign Up</button>
      </form>

      <div>{error && <p className="text-red-500">{error}</p>}</div>
    </div>
  );
}

export default SignUp;
