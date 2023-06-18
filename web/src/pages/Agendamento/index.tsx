// Importacoes

import ButtonPadrao from 'components/ButtonPadrao';
import ListaCards from './ListaCards';
import TabelaServicos from './TabelaServicos';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProfissional } from 'types/IProfissional';
import { IServico } from 'types/IServico';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
  isSunday,
  addDays,
  format,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfYear,
} from 'date-fns';

import ptBR from 'date-fns/locale/pt-BR';
import MensagemFeedback from 'components/MensagemFeedback';
import SelectHorario from './SelectHorario';

const Agendamento = () => {
  // useStates ou Variaveis
  const [listaProfissionais, setListaProfissionais] = useState<IProfissional[]>(
    []
  );
  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState<IProfissional | null>(null);
  const [listaServicos, setListaServicos] = useState<IServico[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<IServico | null>(
    null
  );
  const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(
    undefined
  );
  const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
    subMessage: '',
  });

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

  // Selecao de profissional e de servico

  const handleProfissionalSelecionado = (profissional: IProfissional) => {
    setProfissionalSelecionado(profissional);
  };

  const handleServicoSelecionado = (servico: IServico) => {
    setServicoSelecionado(servico);
  };

  // Colocando a data e hora pra funcionar

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDataSelecionada(date);
    }
  };

  const handleTimeChange = (time: string | null) => {
    setHoraSelecionada(time);
  };

  // Colocando o stepper para funcionar

  const handleProximaEtapa = () => {
    setEtapaAtual((etapaAnterior) => etapaAnterior + 1);
  };

  const handleEtapaAnterior = () => {
    setEtapaAtual((etapaAnterior) => etapaAnterior - 1);
  };

  const handleAlteracaoProfissional = () => {
    setEtapaAtual(1);
  };

  const handleAlteracaoServico = () => {
    setEtapaAtual(2);
  };

  const getDisabledDates = () => {
    const disabledDates = [];
    const currentDate = startOfWeek(startOfMonth(new Date()));
    const endDate = endOfMonth(endOfYear(new Date()));

    let currentDateCopy = currentDate;

    while (currentDateCopy <= endDate) {
      if (isSunday(currentDateCopy)) {
        disabledDates.push(new Date(currentDateCopy));
      }
      currentDateCopy = addDays(currentDateCopy, 1);
    }

    return disabledDates;
  };

  // Submit no form todo
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      dataSelecionada &&
      horaSelecionada &&
      profissionalSelecionado &&
      servicoSelecionado
    ) {
      const dataFormatada = format(dataSelecionada, 'yyyy-MM-dd');
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

  return (
    <section className="bg-age">
      <div>
        <div className="flex justify-start items-start p-4 gap-3 mr-[21px] mb-[28px]">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <div
              className={`w-8 h-8 rounded-full ${
                etapaAtual >= 1 ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            ></div>
          </div>

          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <div
              className={`w-8 h-8 rounded-full ${
                etapaAtual >= 2 ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            ></div>
          </div>
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <div
              className={`w-8 h-8 rounded-full ${
                etapaAtual >= 3 ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center max-w-screen"
        >
          <div className="">
            {etapaAtual === 1 && (
              <>
                <div className="bg-[#828282] p-4 mb-4 rounded-[20px]">
                  <div className="flex text-white items-center justify-center">
                    <h1 className="font-face-montserrat font-normal text-[96px] text-center">
                      Profissionais
                    </h1>
                  </div>

                  <div className="w-[1112px] h-[64px] mt-[63px] mb-[58px] bg-white shadow-md rounded-[24px] flex p-4">
                    <div className="flex items-center gap-x-16 px-5">
                      <div className="flex items-center gap-1">
                        <div className="w-10 h-10 bg-[#D9D9D9] maquinabarbear-svg rounded-full"></div>
                        <h3 className="font-face-montserrat font-semibold text-xl text-[#414141]">
                          Barba
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-10 h-10 bg-[#D9D9D9]  pincelcabelo-svg rounded-full"></div>
                        <h3 className="font-face-montserrat font-semibold text-xl text-[#414141]">
                          Pintura
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-10 h-10 bg-[#D9D9D9] cortecabelo-svg rounded-full"></div>
                        <h3 className="font-face-montserrat font-semibold text-xl text-[#414141]">
                          Corte
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-10 h-10 bg-[#D9D9D9] sobrancelhas-svg rounded-full"></div>
                        <h3 className="font-face-montserrat font-semibold text-xl text-[#414141]">
                          Sobrancelha
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-10 h-10 bg-[#D9D9D9] crianca-svg rounded-full"></div>
                        <h3 className="font-face-montserrat font-semibold text-xl text-[#414141]">
                          Atende Crianças
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 ">
                    <ListaCards
                      profissionais={listaProfissionais}
                      onProfissionalSelecionado={handleProfissionalSelecionado}
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-[89px] mb-[80px]">
                  <ButtonPadrao texto="Proximo" onClick={handleProximaEtapa} />
                </div>
              </>
            )}
            {etapaAtual === 2 && (
              <>
                <div className="bg-[#828282] w-[32rem] h-[48rem] p-4 mb-4 rounded-3xl">
                  <div className="flex text-white items-center justify-center">
                    <h1 className="font-face-montserrat font-normal text-[96px] text-center mt-[31px] mb-[78px] mx-[82px]">
                      Serviços
                    </h1>
                  </div>

                  <div className="flex gap-4">
                    <TabelaServicos
                      servicos={listaServicos}
                      onServicoSelecionado={handleServicoSelecionado}
                    />
                  </div>
                  <div className="flex justify-center gap-5">
                    <ButtonPadrao
                      texto="Voltar"
                      onClick={handleEtapaAnterior}
                    />
                    <ButtonPadrao
                      texto="Proximo"
                      onClick={handleProximaEtapa}
                    />
                  </div>
                </div>
              </>
            )}

            {etapaAtual === 3 && (
              <>
                <div>
                  <div className="grid grid-cols-3 gap-32">
                    <div className="flex flex-col text-white">
                      <label>Selecionados</label>
                      <span>
                        Profissional Selecionado:{' '}
                        {profissionalSelecionado?.usu_nomeCompleto}
                      </span>
                      <span
                        onClick={handleAlteracaoProfissional}
                        className="cursor-pointer"
                      >
                        {' '}
                        Alterar
                      </span>
                      <span>
                        Servico Selecionado: {servicoSelecionado?.ser_tipo}, R${' '}
                        {servicoSelecionado?.ser_preco.toFixed(2)},
                      </span>
                      <span
                        onClick={handleAlteracaoServico}
                        className="cursor-pointer"
                      >
                        {' '}
                        Alterar
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <label>Data</label>
                      <Calendar
                        date={dataSelecionada}
                        onChange={handleDateChange}
                        locale={ptBR}
                        disabledDates={getDisabledDates()}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Hora:</label>
                      <div>
                        <SelectHorario
                          horarioSelecionado={horaSelecionada}
                          setHorarioSelecionado={handleTimeChange}
                        />
                      </div>
                    </div>
                  </div>
                  <ButtonPadrao texto="Voltar" onClick={handleEtapaAnterior} />
                  <ButtonPadrao texto="Agendar!" tipo="submit" />
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
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Agendamento;
