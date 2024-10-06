import React from 'react';

interface SelectProps {
  id: string;
  label: string;
  value: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string; // Propiedad opcional para el marcador de posición
}

const Select: React.FC<SelectProps> = ({ id, label, value, onChange, options, name, placeholder }) => {
  // Crear una opción de marcador de posición si se proporciona un placeholder
  const placeholderOption = placeholder ? [{ value: '', label: placeholder }] : [];

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        {placeholderOption.map((option) => (
          <option key={option.value} value={option.value} disabled >
            {option.label}
          </option>
        ))}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
