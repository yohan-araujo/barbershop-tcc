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
      <label htmlFor="professionalDropdown" className="block text-gray-700">
        Selecione um profissional:
      </label>
      <select
        id="professionalDropdown"
        value={profissionalSelecionado || ''}
        onChange={handleSelectChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="">Selecione...</option>
        {profissionais.map((profissional) => (
          <option key={profissional.pro_id} value={profissional.pro_id}>
            {profissional.usu_nomeCompleto}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownProfissional;
