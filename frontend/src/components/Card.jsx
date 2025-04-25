import React, { useState } from "react";
import { useEffect } from "react";

const Card = () => {
  const [cardData, setCardData] = useState([]);

  const fetchCardData = () => {
    fetch("http://localhost:8080/cards")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCardData(data);
      })
      .catch((err) => console.log("Card fetch error: ", err));
  };

  useEffect(() => {
    fetchCardData();

    // Re-fetch when form dispatches the "cardUpdated" event
    const handleCardUpdate = () => {
      fetchCardData();
    };

    window.addEventListener("cardUpdated", handleCardUpdate);

    // Cleanup
    return () => {
      window.removeEventListener("cardUpdated", handleCardUpdate);
    };
  }, []);

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
