import { IAgendamento } from 'types/IAgendamento';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonPadrao from 'components/ButtonPadrao';
import TabelaAgendamento from './TabelaAgendamento';
import MensagemFeedback from 'components/MensagemFeedback';

const AgendaProfissional = () => {
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
    <section className="flex bg-black min-h-screen">
      <div className="flex flex-col m-auto w-3/4 my-12 rounded-3xl bg-[#1D1D1D]">
        <span className="text-center text-[#E29C31] text-6xl font-bold font-merriweather my-24">
          Agenda
        </span>

        <div className="h-[32rem] px-32">
          {listaAgendamentos.length > 0 ? (
            <TabelaAgendamento
              agendamentos={listaAgendamentos}
              onAgendamentoSelecionado={handleAgendamentoSelecionado}
              agendamentosSelecionados={agendamentosSelecionados}
            />
          ) : (
            <div>
              <p className="flex justify-center font-bold font-face-montserrat text-4xl text-white mt-44">
                Nenhum agendamento registrado.
              </p>
            </div>
          )}
        </div>

        <div className="flex mx-auto my-12">
          <ButtonPadrao texto="CONFIRMAR" onClick={handleAlterarStatus} />
        </div>
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

export default AgendaProfissional;
