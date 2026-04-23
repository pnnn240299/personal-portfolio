import React from 'react';

const SimpleEditor = ({ value, onChange }: { value: string; onChange: (content: string) => void }) => {
  return (
    <div className="bg-white">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter content here..."
      />
    </div>
  );
};

export default SimpleEditor;
