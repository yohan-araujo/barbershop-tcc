// Dropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { IOption } from "types/IOptions";

interface DropdownValueProps {
  options: IOption[];
  onSelect: (selectedOption: IOption | null) => void;
}

const DropdownValue: React.FC<DropdownValueProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: IOption) => {
    onSelect(option);
    setSelectedValue(option.value); // Atualiza o valor selecionado
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center items-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue || "Select an option"}</span>
        <ChevronDown className="ml-2 h-5 w-5" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownValue;
