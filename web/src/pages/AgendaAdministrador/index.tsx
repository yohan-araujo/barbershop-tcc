import { useEffect, useState } from 'react';
import Calendario from '../../components/Calendario';
import { IAgendamento } from 'types/IAgendamento';
import { Dayjs } from 'dayjs';
import axios from 'axios';
import { meses } from 'json';
import MensagemFeedback from 'components/MensagemFeedback';
import ListaHorariosClientes from 'components/ListaHorariosClientes';
import { IProfissional } from 'types/IProfissional';
import DropdownProfissional from 'pages/Dashboard/DropdownProfissional';
import ButtonPadrao from 'components/ButtonPadrao';
import Modal from 'components/Modal';

const AgendaAdministrador = () => {
  const [agendamentosDoDia, setAgendamentosDoDia] = useState<IAgendamento[]>(
    []
  );
  const [diaSelecionado, setDiaSelecionado] = useState<Dayjs | null>(null);
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
    subMessage: '',
  });
  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState<IProfissional>();
  const [exibirModal, setExibirModal] = useState(false);

  useEffect(() => {
    if (diaSelecionado) {
      axios
        .get(
          `http://localhost:3001/api/getAgendamentos/${diaSelecionado.format(
            'YYYY-MM-DD'
          )}/${profissionalSelecionado?.pro_id}`
        )
        .then((response) => {
          setAgendamentosDoDia(response.data);
        })
        .catch((error) => {
          console.error('Erro ao carregar os agendamentos:', error);
        });
    } else {
      setAgendamentosDoDia([]);
    }
  }, [diaSelecionado]);

  const handleDiaSelecionado = (dia: Dayjs | null) => {
    setDiaSelecionado(dia);
  };

  const handleConfirmarAgendamento = async (
    agendamentoId: number,
    formaPagamento: string
  ) => {
    try {
      await axios.put(
        'http://localhost:3001/api/atualizarStatusEPagamentoAgendamento',
        {
          agendamentoSelecionado: agendamentoId,
          formaPagamento: formaPagamento,
        }
      );
      setFeedback({
        type: 'success',
        message: 'Agendamento confirmado!',
        subMessage: 'Status e pagamento atualizados com sucesso.',
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: 'Erro ao confirmar o agendamento.',
        subMessage: 'Tente novamente mais tarde.',
      });
      console.error('Erro ao confirmar agendamento:', error);
    }
  };

  const handleExcluir = async (agendamentoId: number) => {
    try {
      // Faça a chamada para excluir o agendamento utilizando o ID
      await axios.delete(
        `http://localhost:3001/api/excluirAgendamento/${agendamentoId}`
      );

      // Atualize a lista de agendamentos após a exclusão
      const updatedAgendamentos = agendamentosDoDia.filter(
        (agendamento) => agendamento.age_id !== agendamentoId
      );
      setAgendamentosDoDia(updatedAgendamentos);

      // Feedback de sucesso
      setFeedback({
        type: 'success',
        message: 'Agendamento excluído com sucesso.',
        subMessage: 'yay',
      });
    } catch (error) {
      // Feedback de erro
      setFeedback({
        type: 'error',
        message: 'Erro ao excluir o agendamento.',
        subMessage: 'Tente novamente mais tarde.',
      });
      console.error('Erro ao excluir agendamento:', error);
    }
  };

  const handleProfissionalSelecionado = (
    profissionalSelecionado: IProfissional
  ) => {
    setProfissionalSelecionado(profissionalSelecionado);
  };

  const handleAbrirModal = () => {
    setExibirModal(true);
  };

  const handleFecharModal = () => {
    setExibirModal(false);
  };

  return (
    <section className="flex bg-black min-h-screen justify-center">
      <div className="w-2/3 h-[48rem] bg-[#1D1D1D] my-24">
        <span className="flex justify-center uppercase text-[#E29C31] font-merriweather my-12 text-5xl">
          Agenda
        </span>
        <div className="grid grid-cols-2">
          <div>
            <div>
              <DropdownProfissional
                aoSelecionarProfissional={handleProfissionalSelecionado}
              />
            </div>
            <div className="flex justify-center">
              <Calendario onDiaSelecionado={handleDiaSelecionado} />
            </div>
            <div className="flex justify-center mt-24">
              <ButtonPadrao
                texto="Editar Agenda"
                outline
                onClick={handleAbrirModal}
              />
              <Modal
                exibirModal={exibirModal}
                titulo="Dia"
                subtitulo={diaSelecionado ? diaSelecionado.format('DD') : ''}
              >
                <div className="flex flex-col gap-24 justify-center my-12">
                  <div className="">
                    <table className="w-full bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                        <tr>
                          <th className="py-3 px-6 text-left">
                            Nome do Cliente
                          </th>
                          <th className="py-3 px-6 text-left">
                            Tipo do Serviço
                          </th>
                          <th className="py-3 px-6 text-left">Horário</th>
                          <th className="py-3 px-6 text-center">Excluir</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm font-light">
                        {agendamentosDoDia.map((agendamento) => (
                          <tr key={agendamento.age_id}>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {agendamento.usu_nomeCompleto}
                            </td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {agendamento.ser_tipo}
                            </td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {agendamento.age_hora}
                            </td>
                            <td className="py-3 px-6 text-center">
                              <ButtonPadrao
                                texto="Excluir"
                                onClick={() =>
                                  handleExcluir(agendamento.age_id)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <ButtonPadrao
                      texto="Fechar"
                      onClick={handleFecharModal}
                      outline
                    />
                  </div>
                </div>

                {feedback.message && (
                  <MensagemFeedback
                    type={feedback.type as 'failure' | 'success'}
                    message={feedback.message}
                    subMessage={feedback.subMessage}
                    onClose={() =>
                      setFeedback({
                        type: '',
                        message: '',
                        subMessage: '',
                      })
                    }
                    redirectTo="/perfilCliente"
                  />
                )}
              </Modal>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            {diaSelecionado && profissionalSelecionado ? (
              <>
                <div className="text-center my-2 font-bold text-3xl">
                  <p className="text-white font-face-montserrat">
                    Agendados para: <br />
                    <span className="text-[#E29C31] font-face-montserrat">
                      {diaSelecionado.format('DD')} de{' '}
                      {meses[diaSelecionado.month()]}
                    </span>{' '}
                    de{' '}
                    <span className="text-[#E29C31] font-face-montserrat">
                      {diaSelecionado.year()}
                    </span>
                  </p>
                </div>

                <div className="flex justify-center">
                  <ListaHorariosClientes
                    agendamentos={agendamentosDoDia}
                    onConfirmarAgendamento={handleConfirmarAgendamento}
                  />
                </div>
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
              </>
            ) : (
              <div>
                <span>escolha um dia</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaAdministrador;
