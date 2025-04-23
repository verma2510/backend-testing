import React, { useState, useEffect } from 'react'
import Form from '../components/Form';

const Home = () => {

  const [info, setInfo] = useState([]);

  useEffect(() => {
  fetch("http://localhost:8080/data")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    setInfo(data);
  })
  .catch((err) => console.log(err));
  }
  ,[]);

  return (
    <div className="h-screen bg-[#447975c6] flex flex-col items-center justify-center gap-10 p-4">
      <h1 className="text-3xl text-white font-bold">
        Welcome to the {info.name}'s Page
      </h1>
      <div className='gap-4 flex items-center justify-center'>
        <input
          type="text"
          placeholder="Your Name..."
          className="p-1 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-900"
          value={info.name}
        />
        <input
          type="text"
          placeholder="Your Desgination..."
          className="p-1 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-900"
          value={info.designation}
        />
        <input
          type="text"
          placeholder="Your Age..."
          className="p-1  bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-900"
          value={info.age}
        />
      </div>
      <Form/>
    </div>
  );
};

export default Home