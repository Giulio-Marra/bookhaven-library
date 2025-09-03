import React from "react";

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex flex-col w-full">
        <span className="text-gray-800 text-sm font-medium">{label}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required={required}
        />
      </label>
    </div>
  );
};

export default InputField;
