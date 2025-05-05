import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Form = () => {
  const [details, setDetails] = useState({
    name: "",
    age: "",
    designation: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const noErrors = Object.values(errors).every((err) => err === "");
    const allFilled =
      details.name.trim() &&
      details.age &&
      details.designation.trim() &&
      !isNaN(details.age) &&
      parseInt(details.age) > 0;
    setIsValid(noErrors && allFilled);
  }, [details, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Live validation logic
    let error = "";
    if (name === "name" && !value) {
      error = "Name is required.";
    } else if (name === "age") {
      if (!value) {
        error = "Age is required.";
      } else if (isNaN(value) || parseInt(value) <= 0) {
        error = "Age must be a positive number.";
      }
    } else if (name === "designation" && !value) {
      error = "Designation is required.";
    }

    // Set individual field error
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!details.name) newErrors.name = "Name is required.";
    if (!details.age) newErrors.age = "Age is required.";
    else if (isNaN(details.age) || details.age <= 0)
      newErrors.age = "Age must be a positive number.";
    if (!details.designation)
      newErrors.designation = "Designation is required.";
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
      .catch((err) => {
        console.log(err);
        toast.error("Error updating user details. Please try again later.");
      });
  };

  const handleReset = () => {
    setDetails({
      name: "",
      age: "",
      designation: "",
    });
    setErrors({});
  };

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
          disabled={!isValid} // ✅ disable when form is not valid
          className={`w-full font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 
            ${
              isValid
                ? "bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Reset Data
        </button>
      </form>
    </div>
  );
};

export default Form;
