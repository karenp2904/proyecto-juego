import React, { useState } from 'react';

interface DiceInputProps {
  id: string;
  label: string;
  value: DiceInputValue;
  onChange: (newValue: DiceInputValue) => void;
}

export interface DiceInputValue {
  modificador: string;
  lanzamientos: string;
  caras: string;
}

const DiceInput: React.FC<DiceInputProps> = ({ id, label, value, onChange }) => {
  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, modificador: e.target.value });
  };

  const handleDiceCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, lanzamientos: e.target.value });
  };

  const handleDiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, caras: e.target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <div className="flex items-center">
        <input
          id={`${id}-base`}
          type="number"
          value={value.modificador}
          onChange={handleBaseChange}
          className="w-20 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Base"
        />
        <span className="mx-2">+</span>
        <input
          id={`${id}-dice-count`}
          type="number"
          value={value.lanzamientos}
          onChange={handleDiceCountChange}
          className="w-20 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="1"
        />
        <select
          id={`${id}-dice-type`}
          value={value.caras}
          onChange={handleDiceTypeChange}
          className="w-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="d4">d4</option>
          <option value="d6">d6</option>
          <option value="d8">d8</option>
          <option value="d10">d10</option>
          <option value="d12">d12</option>
          <option value="d20">d20</option>
          <option value="d100">d100</option>
        </select>
      </div>
    </div>
  );
};

export default DiceInput;
