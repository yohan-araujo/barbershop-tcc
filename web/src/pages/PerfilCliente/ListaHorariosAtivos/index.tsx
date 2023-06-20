import { IAgendamento } from 'types/IAgendamento';

interface ListaHorariosAtivosProps {
  agendamentos: IAgendamento[];
}

const ListaHorariosAtivos = ({ agendamentos }: ListaHorariosAtivosProps) => {
  return (
    <div className="bg-[#677381] shadow-inner rounded-lg p-5">
      <table className="text-white">
        <thead>
          <tr>
            <th className="font-face-montserrat">Data</th>
            <th className="font-face-montserrat">Hora</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((horario) => (
            <tr key={horario.age_id}>
              <td className="font-face-montserrat">
                {new Date(horario.age_data).toLocaleDateString('pt-BR')}
              </td>
              <td className="font-face-montserrat">
                {horario.age_hora.substring(0, 5)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaHorariosAtivos;
