import React from "react";

const Input = ({
  type = "text",
  name = "",
  label,
  placeholder = "",
  className = "",
  labelClassName = "",
  contextClassName = "",
}) => {
  return (
    <div className={`input-context ${contextClassName}`}>
      {label && (
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={className}
        id={name}
      />
    </div>
  );
};

export default Input;
