import { IAgendamento } from 'types/IAgendamento';
import { ICliente } from 'types/ICliente';
import CardCliente from './CardCliente';

interface ListaCardsClientesProps {
  agendamentos: IAgendamento[];
}

const ListaCardsClientes = ({ agendamentos }: ListaCardsClientesProps) => {
  return (
    <div className="h-[24rem] w-[24rem] bg-black p-12">
      {agendamentos.map((agendamento) => (
        <CardCliente key={agendamento.age_id} agendamento={agendamento} />
      ))}
    </div>
  );
};

export default ListaCardsClientes;
