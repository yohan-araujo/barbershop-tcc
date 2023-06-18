import { IAgendamento } from 'types/IAgendamento';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonPadrao from 'components/ButtonPadrao';
import TabelaAgendamento from './TabelaAgendamento';
import MensagemFeedback from 'components/MensagemFeedback';

const ConfirmarServico = () => {
  const [listaAgendamentos, setListaAgendamentos] = useState<IAgendamento[]>(
    []
  );
  const [agendamentosSelecionados, setAgendamentosSelecionados] = useState<
    number[]
  >([]);
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
    subMessage: '',
  });

  useEffect(() => {
    axios
      .get<IAgendamento[]>(
        `http://localhost:3001/api/getAgendamentos/${sessionStorage.getItem(
          'proId'
        )}`
      )
      .then((response) => {
        setListaAgendamentos(response.data);
      });
  }, []);

  const handleAgendamentoSelecionado = (agendamento: IAgendamento) => {
    setAgendamentosSelecionados((agendamentosSelecionadosAntigos) => {
      const isSelected = agendamentosSelecionadosAntigos.includes(
        agendamento.age_id
      );
      if (isSelected) {
        return agendamentosSelecionadosAntigos.filter(
          (id) => id !== agendamento.age_id
        );
      } else {
        return [...agendamentosSelecionadosAntigos, agendamento.age_id];
      }
    });
  };

  const handleAlterarStatus = () => {
    axios
      .put('http://localhost:3001/api/atualizarStatusAgendamentos', {
        agendamentosSelecionados,
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
    <section>
      <div>
        {listaAgendamentos.length > 0 ? (
          <TabelaAgendamento
            agendamentos={listaAgendamentos}
            onAgendamentoSelecionado={handleAgendamentoSelecionado}
            agendamentosSelecionados={agendamentosSelecionados}
          />
        ) : (
          <div>
            <p className="flex justify-center font-bold font-face-montserrat text-4xl">
              Nenhum agendamento registrado.
            </p>
          </div>
        )}
      </div>
      <div>
        <ButtonPadrao texto="Alterar" onClick={handleAlterarStatus} />
      </div>
      {feedback.message && (
        <MensagemFeedback
          type={feedback.type as 'failure' | 'success'}
          message={feedback.message}
          subMessage={feedback.subMessage}
          onClose={() => setFeedback({ type: '', message: '', subMessage: '' })}
        />
      )}
    </section>
  );
};

export default ConfirmarServico;
