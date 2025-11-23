// src/components/SearchInput.tsx
import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Buscar cliente..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="
        w-full px-4 py-2.5 
        rounded-xl 
        border border-gray-300 
        bg-gray-50 
        text-gray-700 
        shadow-sm
        focus:outline-none
        focus:ring-2 focus:ring-blue-500 
        focus:border-blue-500
        placeholder:text-gray-400
        transition
      "
    />
  );
};

export default SearchInput;
