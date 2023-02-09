import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block-text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>

        {isSurpriseMe && (
          <div
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-slate-200 py-1 px-2 rounded-md text-black cursor-pointer"
          >
            Surpise Me
          </div>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-blue-700 outline-none block w-full p-3"
      />
    </div>
  );
};

export default FormField;
