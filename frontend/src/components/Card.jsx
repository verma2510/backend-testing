import React, { useState, useEffect } from "react";

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

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/cards/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Delete success: ", data);
        setCardData((prevData) => prevData.filter((user) => user._id !== id));
      })
      .catch((err) => console.log("Delete error: ", err));
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        User Cards
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">Age: {user.age}</p>
              <p className="text-gray-600">Designation: {user.designation}</p>
            </div>
            <button
              onClick={() => handleDelete(user._id)}
              className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
