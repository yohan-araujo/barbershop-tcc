import { useEffect } from 'react';
import { IAgendamento } from 'types/IAgendamento';

interface TabelaAgendamentoProps {
  agendamentos: IAgendamento[];
  agendamentosSelecionados: number[];
  onAgendamentoSelecionado: (agendamento: IAgendamento) => void;
}

const TabelaAgendamento = ({
  agendamentos,
  onAgendamentoSelecionado,
  agendamentosSelecionados,
}: TabelaAgendamentoProps) => {
  useEffect(() => {
    console.log(agendamentosSelecionados);
  }, [agendamentosSelecionados]);

  const handleAgendamentoSelecionado = (agendamento: IAgendamento) => {
    onAgendamentoSelecionado(agendamento);
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2 text-left">Data</th>
          <th className="border p-2 text-left">Hora</th>
          <th className="border p-2 text-left">Nome do Cliente</th>
          <th className="border p-2 text-left">Servico</th>
          <th className="border p-2 text-left">Status</th>
          <th className="border p-2 text-left">Selecionar</th>
        </tr>
      </thead>
      <tbody>
        {agendamentos.map((agendamento) => (
          <tr key={agendamento.age_id} className="hover:bg-gray-100">
            <td className="border p-2 text-left">{agendamento.age_data}</td>
            <td className="border p-2 text-left">{agendamento.age_hora}</td>
            <td className="border p-2 text-left">
              {agendamento.usu_nomeCompleto}
            </td>
            <td className="border p-2 text-left">{agendamento.ser_tipo}</td>
            <td className="border p-2 text-left">{agendamento.age_status}</td>
            <td className="border p-2 text-left">
              <input
                type="checkbox"
                value={agendamento.age_id}
                checked={agendamentosSelecionados.includes(agendamento.age_id)}
                onChange={() => handleAgendamentoSelecionado(agendamento)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaAgendamento;
