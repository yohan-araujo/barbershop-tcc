import CardCliente from './CardCliente';
import { IAgendamento } from 'types/IAgendamento';

interface ListaCardsClientesProps {
  agendamentos: IAgendamento[];
  onConfirmarAgendamento: (
    agendamentoId: number,
    formaPagamento: string
  ) => void;
}

const ListaCardsClientes: React.FC<ListaCardsClientesProps> = ({
  agendamentos,
  onConfirmarAgendamento,
}) => {
  return (
    <div>
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

export default ListaCardsClientes;
