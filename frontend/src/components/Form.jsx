import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchFormData } from "../services/api";

const Form = () => {
  const [details, setDetails] = useState({
    name: "",
    age: "",
    designation: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const formFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter your age",
    },
    {
      name: "designation",
      label: "Designation",
      type: "text",
      placeholder: "Enter your designation",
    },
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetchFormData(details);
      const data = await response.json();

      if (response.ok) {
        console.log("User updated frontend log: ", data);

        // Trigger a custom event to notify card component
        window.dispatchEvent(new Event("cardUpdated"));

        // Reset form
        setDetails({ name: "", age: "", designation: "" });
        setErrors({});
        toast.success("User details updated successfully!");
      } else {
        throw new Error(data.message || "Failed to update user details.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating user details. Please try again later.");
    }
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
        {formFields.map(({ name, label, type, placeholder }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={details[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500"
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={!isValid}
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
