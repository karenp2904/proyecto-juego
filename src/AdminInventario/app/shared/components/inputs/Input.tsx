import React, { ChangeEvent } from 'react';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  name?:string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ id, label, type = 'text', value, onChange, placeholder, name }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default Input;
