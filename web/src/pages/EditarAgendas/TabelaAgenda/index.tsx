import axios from 'axios';
import MensagemFeedback from 'components/MensagemFeedback';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import { IAgendamento } from 'types/IAgendamento';
import { IProfissional } from 'types/IProfissional';

interface TabelaAgendaProps {
  agendamentos: IAgendamento[];
  profissionalSelecionado?: IProfissional;
}

const TabelaAgenda = ({
  agendamentos,
  profissionalSelecionado,
}: TabelaAgendaProps) => {
  const [linhasSelecionadas, setLinhasSelecionadas] = useState<number[]>([]);
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
    subMessage: '',
  });

  const handleSelecaoDeLinha = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowId: number
  ) => {
    if (event.target.checked) {
      setLinhasSelecionadas([...linhasSelecionadas, rowId]); // Adiciona o ID da linha selecionada
    } else {
      setLinhasSelecionadas(linhasSelecionadas.filter((id) => id !== rowId)); // Remove o ID da linha desselecionada
    }
  };

  const handleDeleteLinhas = () => {
    axios
      .delete('http://localhost:3001/api/deleteAgendamentos', {
        data: {
          agendamentosSelecionados: linhasSelecionadas,
        },
      })
      .then(() => {
        setFeedback({
          type: 'success',
          message: 'Sucesso',
          subMessage: 'Agendamentos excluídos com sucesso!',
        });
        window.location.reload();
      })
      .catch((error) => {
        setFeedback({
          type: 'failure',
          message: 'Falhou',
          subMessage: 'Erro ao excluir os agendamentos.',
        });
      });
  };

  const handleUpdateLinhas = () => {
    axios
      .put('http://localhost:3001/api/atualizarStatusAgendamentos', {
        agendamentosSelecionados: linhasSelecionadas,
      })
      .then(() => {
        setFeedback({
          type: 'success',
          message: 'Sucesso',
          subMessage: 'Alteração de status realizado com sucesso!',
        });
        window.location.reload();
      })
      .catch((error) => {
        setFeedback({
          type: 'failure',
          message: 'Falhou',
          subMessage: 'Alteração de status não foi realizado!',
        });
      });
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr style={{ backgroundColor: profissionalSelecionado?.usu_foto }}>
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
            Ações
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
              <input
                type="checkbox"
                value={agendamento.age_id}
                checked={linhasSelecionadas.includes(agendamento.age_id)}
                onChange={(event) =>
                  handleSelecaoDeLinha(event, agendamento.age_id)
                }
              />
            </td>
            <td className="flex flex-row justify-center border p-2  text-white font-face-montserrat space-x-2">
              <button onClick={handleDeleteLinhas}>
                <Trash />
              </button>
              <button onClick={handleUpdateLinhas}>
                <Edit />
              </button>
              {feedback.message && (
                <MensagemFeedback
                  type={feedback.type as 'failure' | 'success'}
                  message={feedback.message}
                  subMessage={feedback.subMessage}
                  onClose={() =>
                    setFeedback({ type: '', message: '', subMessage: '' })
                  }
                />
              )}
            </td>
          </tr>
        ))}
      </thead>
    </table>
  );
};

export default TabelaAgenda;
