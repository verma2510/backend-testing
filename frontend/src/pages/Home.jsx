import React from 'react'

const home = () => {
  return (
    <div className="outline-1 outline-amber-400 flex justify-center gap-10 p-4">
      <input
        type="text"
        placeholder="Your Name..."
        className="border-1 rounded-md"
      />
      <input
        type="text"
        placeholder="Your Desgination..."
        className="border-1 rounded-md"
      />
      <input
        type="text"
        placeholder="Your Age..."
        className="border-1 rounded-md"
      />
    </div>
  );
}

export default home