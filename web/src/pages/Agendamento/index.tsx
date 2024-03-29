// Importacoes

import ButtonPadrao from 'components/ButtonPadrao';
import ListaCards from './ListaCards';
import TabelaServicos from './TabelaServicos';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProfissional } from 'types/IProfissional';
import { IServico } from 'types/IServico';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import MensagemFeedback from 'components/MensagemFeedback';
import SelectHorario from './SelectHorario';
import BarraServicos from './BarraServicos';
import { Dayjs } from 'dayjs';
import Calendario from 'components/Calendario';
import Modal from 'components/Modal';

const Agendamento = () => {
  const [listaProfissionais, setListaProfissionais] = useState<IProfissional[]>(
    []
  );
  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState<IProfissional | null>(null);
  const [listaServicos, setListaServicos] = useState<IServico[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<IServico | null>(
    null
  );
  const [diaSelecionado, setDiaSelecionado] = useState<Dayjs | null>(null);

  const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
    subMessage: '',
  });
  const [cartaoResgatavel, setCartaoResgatavel] = useState(false);
  const [fotoProfissionalSelecionado, setFotoProfissionalSelecionado] =
    useState('');
  const [exibirModal, setExibirModal] = useState(false);
  const [agendamentoConfirmado, setAgendamentoConfirmado] =
    useState<Boolean>(false);

  //Trazendo informação do banco
  useEffect(() => {
    axios
      .get<IProfissional[]>('http://localhost:3001/api/getProfissionais')
      .then((response) => {
        setListaProfissionais(response.data);
      });
  }, []);

  useEffect(() => {
    if (profissionalSelecionado) {
      axios
        .get(
          `http://localhost:3001/api/getServicos/${profissionalSelecionado.pro_id}`
        )
        .then((response) => {
          setListaServicos(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter serviços:', error);
        });
    }
  }, [profissionalSelecionado]);

  useEffect(() => {
    axios
      .get<{ cf_resgatavel: number }>(
        `http://localhost:3001/api/getCartaoResgatavel/${sessionStorage.getItem(
          'clienteID'
        )}`
      )
      .then((response) => {
        if (response.data && response.data.cf_resgatavel === 1) {
          setCartaoResgatavel(true);
        } else {
          setCartaoResgatavel(false);
        }
      })
      .catch((error) => {
        console.error('Erro ao obter cartaoResgatavel:', error);
        setCartaoResgatavel(false);
      });
  }, []);

  // Selecao de profissional e de servico

  const handleProfissionalSelecionado = (profissional: IProfissional) => {
    setProfissionalSelecionado(profissional);
  };

  const handleServicoSelecionado = (servico: IServico) => {
    setServicoSelecionado(servico);
  };

  // Colocando a data e hora pra funcionar

  const handleDiaSelecionado = (dia: Dayjs | null) => {
    setDiaSelecionado(dia);
  };

  const handleTimeChange = (time: string | null) => {
    setHoraSelecionada(time);
  };

  // Colocando o stepper para funcionar

  const handleProximaEtapa = () => {
    if (!cartaoResgatavel) {
      setEtapaAtual((etapaAnterior) => etapaAnterior + 1);
    } else {
      setEtapaAtual((etapaAnterior) => etapaAnterior + 2);
    }
  };

  const handleEtapaAnterior = () => {
    if (!cartaoResgatavel) {
      setEtapaAtual((etapaAnterior) => etapaAnterior - 1);
    } else {
      setEtapaAtual((etapaAnterior) => etapaAnterior - 2);
    }
  };

  // Alteracao na hora da selecao de data e hora
  const handleAlteracaoProfissional = () => {
    setEtapaAtual(1);
  };

  const handleAlteracaoServico = () => {
    setEtapaAtual(2);
  };

  const handleSubmitSemCartao = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      diaSelecionado &&
      horaSelecionada &&
      profissionalSelecionado &&
      servicoSelecionado &&
      agendamentoConfirmado
    ) {
      console.log('era pra ir');
      const dataFormatada = format(diaSelecionado.toDate(), 'yyyy-MM-dd');
      axios
        .post('http://localhost:3001/api/insertAgendamento', {
          data: dataFormatada,
          hora: horaSelecionada,
          profissionalID: profissionalSelecionado.pro_id,
          servicoID: servicoSelecionado.ser_id,
          clienteID: sessionStorage.getItem('clienteID'),
        })
        .then((response) => {
          setFeedback({
            type: 'success',
            message: 'Sucesso',
            subMessage: 'Agendamento realizado com sucesso!',
          });
        })
        .catch((error) => {
          setFeedback({
            type: 'failure',
            message: 'Falhou',
            subMessage: 'Cadastro não foi realizado!',
          });
        });
    }
  };

  const handleSubmitComCartao = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      diaSelecionado &&
      horaSelecionada &&
      profissionalSelecionado &&
      agendamentoConfirmado
    ) {
      const dataFormatada = format(diaSelecionado.toDate(), 'yyyy-MM-dd');
      console.log(
        'profissional: ',
        profissionalSelecionado,
        'servico selecionado',
        servicoSelecionado,
        horaSelecionada,
        dataFormatada
      );
      axios
        .post('http://localhost:3001/api/insertAgendamentoGratuito', {
          data: dataFormatada,
          hora: horaSelecionada,
          profissionalID: profissionalSelecionado.pro_id,
          clienteID: sessionStorage.getItem('clienteID'),
        })
        .then((response) => {
          setFeedback({
            type: 'success',
            message: 'Sucesso',
            subMessage: 'Agendamento realizado com sucesso!',
          });
        })
        .catch((error) => {
          setFeedback({
            type: 'failure',
            message: 'Falhou',
            subMessage: 'Agendamento não foi realizado!',
          });
        });
    }
  };

  useEffect(() => {
    if (profissionalSelecionado) {
      fetch(
        `http://localhost:3001/api/getImagensPerfis/${profissionalSelecionado.usu_id}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao obter a foto do perfil');
          }
          return response.text();
        })
        .then((data) => {
          setFotoProfissionalSelecionado(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [profissionalSelecionado]);

  const handleAbrirModal = () => {
    setExibirModal(true);
  };

  const handleFecharModal = () => {
    setExibirModal(false);
  };

  const handleAgendamentoConfirmado = () => {
    setAgendamentoConfirmado(true);
  };

  return (
    <section className="bg-black">
      <div>
        <form
          onSubmit={
            cartaoResgatavel ? handleSubmitComCartao : handleSubmitSemCartao
          }
          className="flex justify-center"
        >
          <div className="">
            {etapaAtual === 1 && (
              <>
                <div className="relative">
                  <div className="absolute top-5 left-5 h-[72.5rem] w-[68rem] border-2 border-[#E29C31]"></div>
                  <div className="relative z-10 bg-[#1D1D1D] px-7 py-4 mt-24 h-[72rem]">
                    <div className="flex justify-center my-12">
                      <h1 className="font-merriweather font-semibold text-5xl text-center text-[#E29C31]">
                        Escolha o profissional:
                      </h1>
                    </div>

                    <BarraServicos />

                    <div className="flex gap-4 my-24">
                      <ListaCards
                        profissionais={listaProfissionais}
                        onProfissionalSelecionado={
                          handleProfissionalSelecionado
                        }
                      />
                    </div>

                    <div className="flex justify-center mt-[89px] mb-[80px]">
                      <ButtonPadrao
                        texto="Próximo"
                        onClick={handleProximaEtapa}
                        outline
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {etapaAtual === 2 && (
              <>
                <div className="relative">
                  <div className="absolute top-4 left-5 h-[50rem] w-[36rem] border-2 border-[#E29C31]"></div>
                  <div className="relative bg-[#1D1D1D] w-[36rem] h-[50rem] p-4 mt-12 z-10 shadow-xl">
                    <div className="flex flex-col  text-center mt-12">
                      <h1 className="font-merriweather font-bold text-5xl text-[#E29C31]">
                        Escolha o serviço:
                      </h1>
                      <h1 className="font-face-montserrat text-xl text-white mt-4">
                        Selecione um serviço para continuar o processo de
                        agendamento.
                      </h1>
                    </div>

                    <div className="flex px-4">
                      <TabelaServicos
                        servicos={listaServicos}
                        onServicoSelecionado={handleServicoSelecionado}
                      />
                    </div>
                    <div className="flex justify-center gap-5 ">
                      <ButtonPadrao
                        texto="Voltar"
                        onClick={handleEtapaAnterior}
                        outline
                      />
                      <ButtonPadrao
                        texto="Próximo"
                        onClick={handleProximaEtapa}
                        outline
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {etapaAtual === 3 && (
              <>
                <div className="relative">
                  <div className="absolute top-5 left-5 h-[64.5rem] w-[87rem] border-2 border-[#E29C31]"></div>
                  <div className="flex flex-col bg-[#1D1D1D]  px-12 py-12  mt-24 justify-center relative z-10">
                    <div className="mt-6">
                      <h1 className="text-[#E29C31] font-merriweather font-bold text-4xl text-center ">
                        Agende seu horário
                      </h1>
                    </div>
                    <div className="grid grid-cols-5 gap-9 m-12">
                      <div className="flex flex-col col-span-3 px-12">
                        <div className="border-b border-[#E29C31] w-[25.5rem] my-12">
                          <span className="text-start text-[#E29C31] font-semibold font-merriweather text-3xl">
                            Selecione o dia e o horário:
                          </span>
                        </div>

                        <div className="grid grid-cols-3 my-6 gap-12">
                          <div className="col-span-2 flex flex-auto">
                            <Calendario
                              onDiaSelecionado={handleDiaSelecionado}
                            />
                          </div>

                          <div className="col-span-1 flex flex-auto">
                            <SelectHorario
                              horarioSelecionado={horaSelecionada}
                              setHorarioSelecionado={handleTimeChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-col gap-16 justify-center items-center">
                        <div className="">
                          <span className="text-[#E29C31] font-face-montserrat font-bold text-3xl">
                            Serviço Selecionado:
                          </span>
                          <hr className="border-[#E29C31]" />
                          <div className="flex border border-[#E29C31] h-16 px-4 gap-4 mt-6">
                            <div className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white text-black mt-2">
                              icon
                            </div>
                            <span className="text-white uppercase font-face-montserrat font-bold  text-xl mt-4">
                              {cartaoResgatavel
                                ? 'Corte Gratuito'
                                : servicoSelecionado?.ser_tipo}
                            </span>
                          </div>
                          <div className="flex justify-center mt-2">
                            <span
                              className="text-white uppercase font-face-montserrat font-bold cursor-pointer hover:text-[#E29C31] transition duration-200 ease-in-out"
                              onClick={handleAlteracaoServico}
                            >
                              alterar
                            </span>
                          </div>
                        </div>
                        <div className="">
                          <span className="text-[#E29C31] font-face-montserrat font-bold text-3xl">
                            Profissional Selecionado:
                          </span>
                          <hr className="border-[#E29C31]" />
                          <div className="flex border border-[#E29C31] h-16 px-4 gap-4 mt-6">
                            <div className="w-12 h-12 overflow-hidden rounded-full mt-2">
                              <img
                                src={fotoProfissionalSelecionado}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="mt-4">
                              <span className="text-white uppercase font-face-montserrat font-bold text-xl">
                                {profissionalSelecionado?.usu_nomeCompleto}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center mt-2">
                            <span
                              className="text-white uppercase font-face-montserrat font-bold cursor-pointer hover:text-[#E29C31] transition duration-200 ease-in-out"
                              onClick={handleAlteracaoProfissional}
                            >
                              alterar
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap m-12 justify-center gap-12">
                      <ButtonPadrao
                        texto={'Próximo'}
                        outline
                        onClick={handleAbrirModal}
                      />

                      <ButtonPadrao
                        texto="Voltar"
                        onClick={handleEtapaAnterior}
                        outline
                      />
                    </div>
                    {etapaAtual === 3 && exibirModal && (
                      <Modal
                        exibirModal={exibirModal}
                        titulo="Confirmação de agendamento"
                      >
                        <span className="text-[#E29C31] font-merriweather text-2xl my-4">
                          Local:{' '}
                          <span className="text-white text-2xl font-face-montserrat ml-5">
                            Rua: Manoel Gomes Nº: 128 Bairro: Jardim do Sol
                          </span>
                        </span>
                        <hr className="border-[#E29C31] my-4" />
                        <span className="text-[#E29C31] font-merriweather text-2xl my-4">
                          Profissional:{' '}
                          <span className="text-white text-2xl font-face-montserrat ml-5">
                            {profissionalSelecionado?.usu_nomeCompleto}
                          </span>
                        </span>
                        <hr className="border-[#E29C31] my-4" />
                        <span className="text-[#E29C31] font-merriweather text-2xl my-4">
                          Serviço:{' '}
                          <span className="text-white text-2xl font-face-montserrat ml-5">
                            {cartaoResgatavel
                              ? 'Corte Gratuito'
                              : servicoSelecionado?.ser_tipo}
                          </span>
                        </span>
                        <hr className="border-[#E29C31] my-4" />
                        <span className="text-[#E29C31] font-merriweather text-2xl my-4">
                          Data/Hora:
                          <span className="text-white text-2xl font-face-montserrat ml-5">
                            {diaSelecionado &&
                              diaSelecionado.format('DD/MM/YYYY')}{' '}
                            às {horaSelecionada}
                          </span>
                        </span>
                        <hr className="border-[#E29C31] my-4" />

                        <div className="flex flex-row gap-24 justify-center my-12">
                          <ButtonPadrao
                            texto="Fechar"
                            onClick={handleFecharModal}
                            outline
                          />
                          <ButtonPadrao
                            texto={
                              cartaoResgatavel
                                ? 'agendar gratuitamente'
                                : 'agendar'
                            }
                            onClick={handleAgendamentoConfirmado}
                            outline
                            tipo="submit"
                          />
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
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
      <div className="flex justify-center gap-3 py-16">
        {cartaoResgatavel ? (
          <>
            <div className="w-12 h-12 bg-[#1D1D1D] flex items-center justify-center rounded-full">
              <div
                className={`w-8 h-8 rounded-full ${
                  etapaAtual >= 1 ? 'bg-[#E29C31]' : 'bg-[#1D1D1D]'
                }`}
              ></div>
            </div>
            <div className="w-12 h-12 bg-[#1D1D1D] flex items-center justify-center rounded-full">
              <div
                className={`w-8 h-8 rounded-full ${
                  etapaAtual >= 2 ? 'bg-[#E29C31]' : 'bg-[#1D1D1D]'
                }`}
              ></div>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 bg-[#1D1D1D] flex items-center justify-center rounded-full">
              <div
                className={`w-8 h-8 rounded-full ${
                  etapaAtual >= 1 ? 'bg-[#E29C31]' : 'bg-[#1D1D1D]'
                }`}
              ></div>
            </div>
            <div className="w-12 h-12 bg-[#1D1D1D] flex items-center justify-center rounded-full">
              <div
                className={`w-8 h-8 rounded-full ${
                  etapaAtual >= 2 ? 'bg-[#E29C31]' : 'bg-[#1D1D1D]'
                }`}
              ></div>
            </div>
            <div className="w-12 h-12 bg-[#1D1D1D] flex items-center justify-center rounded-full">
              <div
                className={`w-8 h-8 rounded-full ${
                  etapaAtual >= 3 ? 'bg-[#E29C31]' : 'bg-[#1D1D1D]'
                }`}
              ></div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Agendamento;
