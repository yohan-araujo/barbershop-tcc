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
      <label htmlFor="filterDropdown" className="block text-gray-700">
        Selecione um filtro:
      </label>
      <select
        id="filterDropdown"
        value={selectedFilter}
        onChange={handleSelectChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="">Selecione...</option>
        <option value="semanal">Semanal</option>
        <option value="mensal">Mensal</option>
        <option value="semestral">Semestral</option>
      </select>
    </div>
  );
};

export default DropdownFiltro;
