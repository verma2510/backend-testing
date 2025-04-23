import React, { useState } from "react";

const Form = () => {
  const [details, setDetails] = useState({
    name: "",
    age: "",
    designation: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User updated: ", data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-violet-400 rounded-md p-4">
      <form
        action="/update"
        className="flex flex-col gap-4 p-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="font-bold">
          Name
        </label>
        <input
          onChange={handleChange}
          value={details.name}
          type="text"
          name="name"
          className="p-1 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
        />
        <label htmlFor="age" className="font-bold">
          Age
        </label>
        <input
          value={details.age}
          onChange={handleChange}
          type="number"
          name="age"
          className="p-1 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
        />
        <label htmlFor="designation" className="font-bold">
          Designation
        </label>
        <input
          value={details.designation}
          onChange={handleChange}
          type="text"
          name="designation"
          className="p-1 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
        />
        <button
          type="submit"
          className="bg-green-400 p-2 text-white font-bold rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
