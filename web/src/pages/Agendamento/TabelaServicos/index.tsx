import { useState, useEffect } from 'react';
import { IServico } from 'types/IServico';

interface TabelaServicosProps {
  servicos: IServico[];
  onServicoSelecionado: (servico: IServico) => void;
}

const TabelaServicos = ({
  servicos,
  onServicoSelecionado,
}: TabelaServicosProps) => {
  const [servicoSelecionado, setServicoSelecionado] = useState<IServico | null>(
    null
  );

  const handleServicoSelecionado = (servico: IServico) => {
    setServicoSelecionado((servicoSelecionadoAntigo) => {
      if (servicoSelecionadoAntigo === servico) {
        return null;
      }
      return servico;
    });
    onServicoSelecionado(servico);
  };

  useEffect(() => {
    console.log(servicoSelecionado);
  }, [servicoSelecionado]);

  return (
    <ul className="w-full">
      {servicos.map((servico) => (
        <li
          key={servico.ser_id}
          className="bg-white h-16 rounded-xl mx-8 mb-8 px-4 grid"
        >
          <label className="relative flex items-center justify-between cursor-pointer">
            <div className=" flex items-center">
              <input
                type="checkbox"
                value={servico.ser_id}
                checked={servicoSelecionado === servico}
                onChange={() => handleServicoSelecionado(servico)}
                className="hidden"
              />
              <div className="w-6 h-6 bg-gray-300 rounded-full border border-gray-400 flex items-center justify-center">
                {servicoSelecionado === servico && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                )}
              </div>

              <div className="flex text-2xl ml-3 font-face-montserrat">
                {servico.ser_tipo}
              </div>
            </div>

            <div className="font-face-montserrat text-2xl">
              R${servico.ser_preco.toFixed(2)}
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TabelaServicos;
