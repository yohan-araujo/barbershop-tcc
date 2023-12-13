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
    <div className="flex justify-center w-[28rem] h-[24rem] max-h-[24rem]  bg-black">
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
