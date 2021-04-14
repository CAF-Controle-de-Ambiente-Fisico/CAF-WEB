import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { cpfMask } from "../../assets/scripts/util/cpfMask";

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
  const watchField = watch(name);

  const [valueInput, setValueInput] = useState(watchField ? watchField : "");

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
          setValue(name, event.target.value);
          setValueInput(
            name === "cpf" ? cpfMask(event.target.value) : event.target.value
          );
        }}
      />
    </div>
  );
};

export default Input;
