import React from "react";

const Input = ({
  type = "text",
  name = "",
  label,
  placeholder = "",
  className = "",
  insideLabel,
}) => {
  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={className}
      />
    </>
  );
};

export default Input;
