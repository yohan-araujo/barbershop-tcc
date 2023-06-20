import { IAgendamento } from 'types/IAgendamento';
import { IProfissional } from 'types/IProfissional';

interface AgendaProfissionalProps {
  agendamentos: IAgendamento[];
  profissionalSelecionado?: IProfissional;
}

const AgendaProfissional = ({
  agendamentos,
  profissionalSelecionado,
}: AgendaProfissionalProps) => {
  console.log(
    'cor do profissional selecionado ',
    profissionalSelecionado?.pro_cor
  );
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr style={{ backgroundColor: profissionalSelecionado?.pro_cor }}>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Data
          </th>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Hora
          </th>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Nome do Cliente
          </th>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Servico
          </th>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Status
          </th>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Selecionar
          </th>
          <th className="border p-2 text-center text-white font-face-montserrat">
            Acoes
          </th>
        </tr>

        {agendamentos.map((agendamento) => (
          <tr key={agendamento.age_id}>
            <td className="border p-2 text-center text-white font-face-montserrat">
              {new Date(agendamento.age_data).toLocaleDateString('pt-BR')}
            </td>
            <td className="border p-2 text-center text-white font-face-montserrat">
              {agendamento.age_hora.substring(0, 5)}
            </td>
            <td className="border p-2 text-center text-white font-face-montserrat">
              {agendamento.usu_nomeCompleto}
            </td>
            <td className="border p-2 text-center text-white font-face-montserrat">
              {agendamento.ser_tipo}
            </td>
            <td className="border p-2 text-center text-white font-face-montserrat">
              {agendamento.age_status ? 'Completo' : 'Incompleto'}
            </td>
            <td className="border p-2 text-center text-white font-face-montserrat">
              <input type="checkbox" value={agendamento.age_id} />
            </td>
            <td className="border p-2 text-center text-white font-face-montserrat space-x-2">
              <span>Excluir</span>
              <span>Alterar</span>
            </td>
          </tr>
        ))}
      </thead>
    </table>
  );
};

export default AgendaProfissional;
