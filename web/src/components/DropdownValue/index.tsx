// Dropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { IOption } from 'types/IOptions';

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: IOption) => {
    onSelect(option);
    setSelectedValue(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center items-center w-full px-3 py-2 border border-[#E29C31] hover:border-[#E29C31] text-xl font-medium bg-[#E29C31] hover:bg-black hover:text-white uppercase"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-face-montserrat">
          {selectedValue || 'Selecionar: '}
        </span>
        <ChevronDown className="ml-2 h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-56 bg-black">
          <div
            className="py-1"
            role="menu"
            aria-orientation="horizontal"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="flex flex-row px-4 py-2 w-full hover:bg-[#E29C31] hover:text-black border border-[#E29C31]"
                role="menuitem"
              >
                <div className="flex flex-row gap-4">
                  <span className="text-white ">{option.icon}</span>
                  <span className="text-white font-face-montserrat font-bold uppercase ">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownValue;
