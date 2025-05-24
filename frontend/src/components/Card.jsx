import React, { useState, useEffect } from "react";
import { fetchCardData } from "../services/api";

const Card = () => {
  const [cardData, setCardData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const sortButtons = [
    { field: "name", label: "Name" },
    { field: "age", label: "Age" },
    { field: "designation", label: "Designation" },
  ];

  const pageNumbers = Math.ceil(
    cardData.filter((user) => !showFavorites || favorites.includes(user._id))
      .length / itemsPerPage
  );

  const handleChange = (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    setSearch(searchValue);

    if (searchValue.trim() === "") {
      setCardData(originalData);
    } else {
      const filteredData = originalData.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setCardData(filteredData);
    }
  };

  const loadCardData = async () => {
    try {
      const data = await fetchCardData();
      setCardData(data);
      setOriginalData(data);
    } catch (err) {
      console.error("Error fetching card data:", err);
    }
  };

  useEffect(() => {
    loadCardData();

    // Re-fetch when form dispatches the "cardUpdated" event
    const handleCardUpdate = () => {
      loadCardData();
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
        setOriginalData((prevData) =>
          prevData.filter((user) => user._id !== id)
        );
      })
      .catch((err) => console.log("Delete error: ", err));
  };

  const handleSort = (field) => {
    const newSortOrder =
      field === sortBy ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    setSortBy(field);
    setSortOrder(newSortOrder);

    const sortedData = [...cardData].sort((a, b) => {
      if (field === "age") {
        return sortOrder === "asc" ? a[field] - b[field] : b[field] - a[field];
      }
      return sortOrder === "asc"
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    });

    setCardData(sortedData);
  };

  const handleToggleFavorite = (userId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(userId)
        ? prevFavorites.filter((id) => id !== userId)
        : [...prevFavorites, userId];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cardData
    .filter((user) => !showFavorites || favorites.includes(user._id))
    .slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          User Cards{" "}
          {favorites.length > 0 && (
            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-2">
              {favorites.length} Favorite{favorites.length !== 1 ? "s" : ""}
            </span>
          )}
        </h2>
      </div>
      <div className="bg-blue-400 p-4 my-4 rounded-md">
        <input
          type="text"
          placeholder="Search users..."
          className="bg-white rounded-md p-1 outline-none focus:ring-2 ring-blue-900 w-180"
          value={search}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-4 py-2 rounded ${
            showFavorites ? "bg-yellow-500" : "bg-gray-400"
          } text-white hover:bg-yellow-600 transition-colors`}
        >
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>
      <div className="flex gap-4 mb-4 justify-center">
        {sortButtons.map(({ field, label }) => (
          <button
            key={field}
            onClick={() => handleSort(field)}
            className={`px-4 py-2 rounded ${
              sortBy === field ? "bg-blue-600" : "bg-blue-400"
            } text-white hover:bg-blue-500 transition-colors`}
          >
            Sort by {label}{" "}
            {sortBy === field && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData
          .filter((user) => !showFavorites || favorites.includes(user._id))
          .map((user) => (
            <div
              key={user._id}
              className={`bg-white shadow-md rounded-lg p-4 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                favorites.includes(user._id)
                  ? "border-2 border-yellow-400 animate-pulse"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-gray-600">Age: {user.age}</p>
                  <p className="text-gray-600">
                    Designation: {user.designation}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleFavorite(user._id)}
                  className="text-2xl focus:outline-none"
                >
                  {favorites.includes(user._id) ? "⭐" : "☆"}
                </button>
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
