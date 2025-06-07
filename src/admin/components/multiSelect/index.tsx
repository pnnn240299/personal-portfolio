import React from 'react';

const MultiSelect = ({ options, selectedValues, onChange }) => {
  const handleSelectChange = (event) => {
    const selected = Array.from(event.target.selectedOptions, (option) => option.value);
    onChange(selected);
  };

  return (
    <div>
      <select multiple value={selectedValues} onChange={handleSelectChange} className="w-full p-2 border border-gray-300 rounded-md mb-4">
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelect;
