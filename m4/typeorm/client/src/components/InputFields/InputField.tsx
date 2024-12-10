import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div>
    <label className="p-2" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="rounded-xl border p-2 w-full"
      aria-invalid={!!error}
      required
    />
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

export default InputField;
