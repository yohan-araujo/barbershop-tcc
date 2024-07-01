import CardCliente from './CardCliente';
import { IAgendamento } from 'types/IAgendamento';

interface ListaHorariosClientesProps {
  agendamentos: IAgendamento[];
  onConfirmarAgendamento: (
    agendamentoId: number,
    formaPagamento: string
  ) => void;
}

const ListaHorariosClientes: React.FC<ListaHorariosClientesProps> = ({
  agendamentos,
  onConfirmarAgendamento,
}) => {
  return (
    <div className="flex flex-col justify-start items-center w-[28rem] h-[26rem] max-h-[26rem] bg-black overflow-y-auto">
      {agendamentos.map((agendamento) => (
        <CardCliente
          key={agendamento.age_id}
          agendamento={agendamento}
          onConfirmarAgendamento={onConfirmarAgendamento}
        />
      ))}
    </div>
  );
};

export default ListaHorariosClientes;
