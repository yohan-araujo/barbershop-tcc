import { IAgendamento } from 'types/IAgendamento';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonPadrao from 'components/ButtonPadrao';
import TabelaAgendamento from './TabelaAgendamento';

const ConfirmarServico = () => {
  const [listaAgendamentos, setListaAgendamentos] = useState<IAgendamento[]>(
    []
  );
  const [agendamentosSelecionados, setAgendamentosSelecionados] = useState<
    number[]
  >([]);

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
        console.log('Status dos agendamentos alterado com sucesso');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Erro ao atualizar status dos agendamentos', error);
      });
  };

  return (
    <section>
      <div>
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
