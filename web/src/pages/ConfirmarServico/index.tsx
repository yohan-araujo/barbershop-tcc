import { IAgendamento } from 'types/IAgendamento';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonPadrao from 'components/ButtonPadrao';
import TabelaAgendamento from './TabelaAgendamento';
import { useNavigate } from 'react-router-dom';

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
      .get<IAgendamento[]>('http://localhost:3001/api/getAgendamentos')
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
      })
      .catch((error) => {
        setFeedback({
          type: 'failure',
          message: 'Falhou',
          subMessage: 'Alteração de status não foi realizado!',
        });
      });
  };

  const navigate = useNavigate();
  return (
    <section>
      <div>
        <ButtonPadrao texto="Voltar" onClick={() => navigate(-2)} />
        <TabelaAgendamento
          agendamentos={listaAgendamentos}
          onAgendamentoSelecionado={handleAgendamentoSelecionado}
          agendamentosSelecionados={agendamentosSelecionados}
        />
      </div>
      <div>
        <ButtonPadrao texto="Alterar" onClick={handleAlterarStatus} />
      </div>
    </section>
  );
};

export default ConfirmarServico;
