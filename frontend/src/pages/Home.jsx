import React, { useState, useEffect } from 'react'

const Home = () => {

  const [info, setInfo] = useState();

  useEffect(() => {
  fetch("http://localhost:8080/data",{
    method: "GET",
    headers:{
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    setInfo(data);
  })
  .catch((err) => console.log(err));
  }
  ,[]);

  return (
    <div className="h-screen bg-[#0b4f4bc6] flex items-center justify-center gap-10 p-4">
      <input
        type="text"
        placeholder="Your Name..."
        className="p-1 bg-white rounded-md"
        value={info.name}
      />
      <input
        type="text"
        placeholder="Your Desgination..."
        className="p-1 bg-white rounded-md"
        value ={info.designation}
      />
      <input
        type="text"
        placeholder="Your Age..."
        className="p-1  bg-white rounded-md"
        value={info.age}
      />
    </div>
  );
};

export default Home