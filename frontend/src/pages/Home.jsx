import React from 'react'

const home = () => {
  return (
    <div className="h-screen bg-[#0b4f4bc6] flex items-center justify-center gap-10 p-4">
      <input
        type="text"
        placeholder="Your Name..."
        className="p-1 bg-white rounded-md"
      />
      <input
        type="text"
        placeholder="Your Desgination..."
        className="p-1 bg-white rounded-md"
      />
      <input
        type="text"
        placeholder="Your Age..."
        className="p-1  bg-white rounded-md"
      />
    </div>
  );
}

export default home