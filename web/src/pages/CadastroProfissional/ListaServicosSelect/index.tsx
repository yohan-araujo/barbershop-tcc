import { useEffect, useState } from 'react';
import { IServico } from 'types/IServico';

interface ListaServicosSelectProps {
  servicos: IServico[];
  onServicoSelecionado: (servico: IServico[]) => void;
}

const ListaServicosSelect = ({
  onServicoSelecionado,
  servicos,
}: ListaServicosSelectProps) => {
  const [servicosSelecionados, setServicosSelecionados] = useState<IServico[]>(
    []
  );

  const handleServicoSelecionado = (
    event: React.ChangeEvent<HTMLInputElement>,
    servicoId: number
  ) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Adiciona o serviço aos selecionados
      const servicoSelecionado = servicos.find(
        (servico) => servico.ser_id === servicoId
      );
      if (servicoSelecionado) {
        setServicosSelecionados([...servicosSelecionados, servicoSelecionado]);
      }
    } else {
      // Remove o serviço dos selecionados
      const updatedSelecionados = servicosSelecionados.filter(
        (servico) => servico.ser_id !== servicoId
      );
      setServicosSelecionados(updatedSelecionados);
    }
  };

  // Chama a função de callback com a lista de serviços selecionados
  useEffect(() => {
    onServicoSelecionado(servicosSelecionados);
  }, [servicosSelecionados, onServicoSelecionado]);

  return (
    <div className="text-white">
      <h1 className="text-white font-face-montserrat text-2xl text-center">
        Qual serviço este profissional realiza?
      </h1>
      <ul className="mt-8">
        {servicos.map((servico) => (
          <li key={servico.ser_id}>
            <label>
              <input
                type="checkbox"
                value={servico.ser_id}
                checked={servicosSelecionados.some(
                  (s) => s.ser_id === servico.ser_id
                )}
                onChange={(e) => handleServicoSelecionado(e, servico.ser_id)}
              />
              <label className="ml-4 text-xl font-face-montserrat">
                {servico.ser_tipo}
              </label>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaServicosSelect;
