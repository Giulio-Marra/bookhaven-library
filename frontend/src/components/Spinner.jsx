import React from "react";

const Spinner = ({ text }) => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white/70 z-50">
      <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-2 text-gray-700 font-bold">{text}</p>
    </div>
  );
};

export default Spinner;
