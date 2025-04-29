import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import Card from "../components/Card";

const Home = () => {
  const [info, setInfo] = useState({
    name: "",
    designation: "",
    age: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/data")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInfo(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-blue-600 flex flex-col items-center justify-center gap-12 p-6">
      <h1 className="text-4xl text-white font-extrabold text-center">
        Welcome to {info.name ? `${info.name}'s Page` : "Our Page"}
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          User Information
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name..."
            className="p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={info.name}
            readOnly
          />
          <input
            type="text"
            placeholder="Your Designation..."
            className="p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={info.designation}
            readOnly
          />
          <input
            type="text"
            placeholder="Your Age..."
            className="p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={info.age}
            readOnly
          />
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <Form />
      </div>

      <div className="w-full max-w-4xl">
        <Card />
      </div>
    </div>
  );
};

export default Home;
