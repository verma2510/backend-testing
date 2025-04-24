import React, { useState } from "react";
import { useEffect } from "react";

const Card = () => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8080/cards")
      .then((res)=> res.json())
      .then((data)=>{
        console.log(data)
        setCardData(data);
      })
      .catch((err)=> console.log("Card fetch error: ", err))
    }, [])
    
  return (
    <div className=" w-content rounded-md p-8 flex gap-4 items-center justify-center bg-pink-200">
      {cardData.map((user) => (
        <div className="h-[200px] w-[150px] p-2 bg-red-400 rounded-md text-white">
          <h1 className="font-bold">{user.name}</h1>
          <p>{user.age}</p>
          <p>{user.designation}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
