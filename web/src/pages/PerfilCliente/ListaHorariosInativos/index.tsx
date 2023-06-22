import { IAgendamento } from 'types/IAgendamento';
import 'moment/locale/pt-br';

interface ListaHorariosInativosProps {
  agendamentos: IAgendamento[];
}

const ListaHorariosInativos = ({
  agendamentos,
}: ListaHorariosInativosProps) => {
  return (
    <div className="bg-[#677381] shadow-inner rounded-lg p-5">
      <table className="text-white">
        <thead>
          <tr>
            <th className="font-face-montserrat px-4 py-2">Data</th>
            <th className="font-face-montserrat px-4 py-2">Hora</th>
            <th className="font-face-montserrat px-4 py-2">Profissional</th>
            <th className="font-face-montserrat px-4 py-2">Serviço</th>
            <th className="font-face-montserrat px-4 py-2">Preço</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((horario) => (
            <tr key={horario.age_id}>
              <td className="font-face-montserrat text-center px-4 py-2">
                {new Date(horario.age_data).toLocaleDateString('pt-BR')}
              </td>
              <td className="font-face-montserrat text-center px-4 py-2">
                {horario.age_hora.substring(0, 5)}
              </td>
              <td className="font-face-montserrat text-center px-4 py-2">
                {horario.usu_nomeCompleto}
              </td>
              <td className="font-face-montserrat text-center px-4 py-2">
                {horario.ser_tipo}
              </td>
              <td className="font-face-montserrat text-center px-4 py-2">
                R$ {horario.ser_preco.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaHorariosInativos;
