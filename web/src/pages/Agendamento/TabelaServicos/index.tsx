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
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2 text-left">Tipo</th>
          <th className="border p-2 text-left">Preço</th>
          <th className="border p-2 text-left">Selecionar</th>
        </tr>
      </thead>
      <tbody>
        {servicos.map((servico) => (
          <tr key={servico.ser_id} className="hover:bg-gray-100">
            <td className="border p-2 text-left">{servico.ser_tipo}</td>
            <td className="border p-2 text-left">
              R$ {servico.ser_preco.toFixed(2)}
            </td>
            <td className="border p-2 text-left">
              <input
                type="checkbox"
                value={servico.ser_id}
                checked={servicoSelecionado === servico}
                onChange={() => handleServicoSelecionado(servico)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaServicos;
