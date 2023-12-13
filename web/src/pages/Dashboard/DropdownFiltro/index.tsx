import React, { useState } from 'react';

interface DropdownFiltroProps {
  onSelectFilter: (filter: string) => void;
}

const DropdownFiltro = ({ onSelectFilter }: DropdownFiltroProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSelectedFilter(selectedOption);
    onSelectFilter(selectedOption);
  };

  return (
    <div className="mt-4">
      <select
        id="filterDropdown"
        value={selectedFilter}
        onChange={handleSelectChange}
        className="mt-1 block w-[12rem] h-12 border border-[#E29C31] bg-black text-[#E29C31] px-4 font-face-montserrat text-2xl"
      >
        <option value="" className="font-face-montserrat text-2xl">
          Selecione...
        </option>
        <option value="semanal" className="font-face-montserrat text-2xl">
          Semanal
        </option>
        <option value="mensal" className="font-face-montserrat text-2xl">
          Mensal
        </option>
        <option value="semestral" className="font-face-montserrat text-2xl">
          Semestral
        </option>
      </select>
    </div>
  );
};

export default DropdownFiltro;
