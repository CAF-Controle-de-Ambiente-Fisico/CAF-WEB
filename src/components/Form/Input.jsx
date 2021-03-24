import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

const Input = ({
  type = "text",
  name = "",
  label,
  placeholder = "",
  className = "",
  labelClassName = "",
  contextClassName = "",
  required = false,
}) => {
  const { register, watch, setValue } = useFormContext();

  register(name);
  const watchDescription = watch(name);

  const [valueInput, setValueInput] = useState(watchDescription);

  return (
    <div className={`input-context ${contextClassName}`}>
      {label && (
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        name={name}
        className={className}
        id={name}
        value={valueInput}
        onChange={(event) => {
          setValueInput(setValueInput);
          setValue(name, event.target.value);
        }}
      />
    </div>
  );
};

export default Input;
