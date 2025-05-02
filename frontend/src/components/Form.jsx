import React, { useState } from "react";

const Form = () => {
  const [details, setDetails] = useState({
    name: "",
    age: "",
    designation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!details.name) newErrors.name = "Name is required.";
    if (!details.age) newErrors.age = "Age is required.";
    else if (isNaN(details.age) || details.age <= 0)
      newErrors.age = "Age must be a positive number.";
    if (!details.designation) newErrors.designation = "Designation is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    fetch("http://localhost:8080/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User updated frontend log: ", data);

        // trigger a custom event to notify card component
        window.dispatchEvent(new Event("cardUpdated"));

        // reset form
        setDetails({ name: "", age: "", designation: "" });
        setErrors({});
      })
      .catch((err) => console.log(err));
  };

  const handleReset = ()=>{
    setDetails({
      name: "",
      age: "",
      designation: "",
    });
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Update User Details
      </h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            onChange={handleChange}
            value={details.name}
            type="text"
            name="name"
            placeholder="Enter your name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            value={details.age}
            onChange={handleChange}
            type="number"
            name="age"
            placeholder="Enter your age"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="designation"
            className="block text-sm font-medium text-gray-700"
          >
            Designation
          </label>
          <input
            value={details.designation}
            onChange={handleChange}
            type="text"
            name="designation"
            placeholder="Enter your designation"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
          />
          {errors.designation && (
            <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 text-white font-bold py-2 px-4 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          Reset Form
        </button>
      </form>
    </div>
  );
};

export default Form;
