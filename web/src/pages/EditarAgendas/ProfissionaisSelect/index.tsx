import { useState } from 'react';
import { IProfissional } from 'types/IProfissional';

interface ProfissionaisSelectProps {
  profissionais: IProfissional[];
  onProfissionalSelect: (profissional: IProfissional) => void;
}

const ProfissionaisSelect = ({
  profissionais,
  onProfissionalSelect,
}: ProfissionaisSelectProps) => {
  const [selectedProfissional, setSelectedProfissional] =
    useState<IProfissional | null>(null);

  const handleProfissionalClick = (profissional: IProfissional) => {
    setSelectedProfissional(profissional);
    onProfissionalSelect(profissional);
  };

  return (
    <div className="flex justify-between space-x-12 cursor-pointer">
      {profissionais.map((profissional) => (
        <div
          key={profissional.pro_id}
          className={`flex flex-row p-4 rounded-xl  ${
            selectedProfissional === profissional
              ? 'bg-blue-500 border-2 border-blue-700'
              : 'bg-[#E29C31]'
          }`}
          onClick={() => handleProfissionalClick(profissional)}
        >
          <img
            src={`http://localhost:3001/uploads/Profissionais/${profissional.usu_id}/${profissional.usu_foto}`}
            alt="foto do profissional"
            className="w-24 rounded-full"
          />
          <span className="font-face-montserrat text-white text-4xl font-semibold mt-6 ml-4">
            {profissional.usu_nomeCompleto}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProfissionaisSelect;
