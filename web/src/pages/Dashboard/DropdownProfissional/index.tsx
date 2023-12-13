import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IProfissional } from 'types/IProfissional';

interface DropdownProfissionalProps {
  aoSelecionarProfissional: (pro_id: IProfissional) => void;
}

const DropdownProfissional = ({
  aoSelecionarProfissional,
}: DropdownProfissionalProps) => {
  const [profissionais, setProfissionais] = useState<IProfissional[]>([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<
    number | null
  >(null);

  useEffect(() => {
    // Função para buscar os profissionais do backend
    const fetchProfissionais = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/getProfissionais'
        );
        setProfissionais(response.data);
      } catch (error) {
        console.error('Erro ao buscar os profissionais:', error);
      }
    };

    // Chama a função para buscar os profissionais ao montar o componente
    fetchProfissionais();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const opcaoSelecionada = parseInt(event.target.value);
    setProfissionalSelecionado(opcaoSelecionada);

    // Encontrar o objeto IProfissional com base no ID selecionado
    const profissionalSelecionado = profissionais.find(
      (profissional) => profissional.pro_id === opcaoSelecionada
    );

    if (profissionalSelecionado) {
      aoSelecionarProfissional(profissionalSelecionado);
      console.log('Profissional: ' + profissionalSelecionado);
    } else {
      console.error('Profissional não encontrado');
    }
  };

  return (
    <div className="mt-4">
      <select
        id="professionalDropdown"
        value={profissionalSelecionado || ''}
        onChange={handleSelectChange}
        className="mt-1 block w-[12rem] h-12 border border-[#E29C31] bg-black text-[#E29C31] px-4 font-face-montserrat text-2xl"
      >
        <option value="" className="font-face-montserrat text-2xl">
          Selecione...
        </option>
        {profissionais.map((profissional) => (
          <option
            key={profissional.pro_id}
            value={profissional.pro_id}
            className="font-face-montserrat text-2xl"
          >
            {profissional.usu_nomeCompleto}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownProfissional;
