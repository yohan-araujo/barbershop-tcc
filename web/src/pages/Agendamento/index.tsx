// Importacoes

import ButtonPadrao from "components/ButtonPadrao";
import ListaCards from "./ListaCards";
import TabelaServicos from "./TabelaServicos";
import { useEffect, useState } from "react";
import axios from "axios";
import { IProfissional } from "types/IProfissional";
import { IServico } from "types/IServico";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";

const Agendamento = () => {
  // useStates ou Variaveis
  const [listaProfissionais, setListaProfissionais] = useState<IProfissional[]>(
    []
  );
  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState<IProfissional | null>(null);
  const [listaServicos, setListaServicos] = useState<IServico[]>([]);
  const [servicoSelecionado, setServicolSelecionado] =
    useState<IServico | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);
  const [etapaAtual, setEtapaAtual] = useState(1);

  //Trazendo informação do banco
  useEffect(() => {
    axios
      .get<IProfissional[]>("http://localhost:3001/api/getProfissionais")
      .then((response) => {
        setListaProfissionais(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get<IServico[]>("http://localhost:3001/api/getServicos")
      .then((response) => {
        setListaServicos(response.data);
      });
  }, []);

  // Selecao de profissional e de servico

  const handleProfissionalSelecionado = (profissional: IProfissional) => {
    setProfissionalSelecionado(profissional);
  };

  const handleServicoSelecionado = (servico: IServico) => {
    setServicolSelecionado(servico);
  };

  // Colocando a data e hora pra funcionar

  const handleDateChange = (date: Date | null) => {
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

  // Submit no form todo
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      dataSelecionada &&
      horaSelecionada &&
      profissionalSelecionado &&
      servicoSelecionado
    ) {
      const dataFormatada = format(dataSelecionada, "yyyy-MM-dd");
      axios
        .post("http://localhost:3001/api/insertAgendamento", {
          data: dataFormatada,
          hora: horaSelecionada,
          profissionalID: profissionalSelecionado.pro_id,
          servicoID: servicoSelecionado.ser_id,
        })
        .then((response) => {
          console.log("Agendamento inserido com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao inserir agendamento:", error);
        });
    }
  };

  return (
    <section className="bg-age">
      
      <div>
        <div className="flex justify-start items-start p-4 gap-3 mb-8">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <div
              className={`w-8 h-8 rounded-full ${
                etapaAtual >= 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          </div>

          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <div
              className={`w-8 h-8 rounded-full ${
                etapaAtual >= 2 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          </div>
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <div
              className={`w-8 h-8 rounded-full ${
                etapaAtual >= 3 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          </div>
        </div>

        <div className="flex justify-center w-screen">
          <form
            onSubmit={handleSubmit}
            className="flex ite rounded-3xl container h-[38rem] 
            w-[82rem] mb-10  bg-slate-400"
          >
            {etapaAtual === 1 && (
              <>
                <ListaCards
                  profissionais={listaProfissionais}
                  onProfissionalSelecionado={handleProfissionalSelecionado}
                />

                <ButtonPadrao texto="Proximo" onClick={handleProximaEtapa} />
              </>
            )}

            {etapaAtual === 2 && (
              <>
                <TabelaServicos
                  servicos={listaServicos}
                  onServicoSelecionado={handleServicoSelecionado}
                />
                <ButtonPadrao texto="Voltar" onClick={handleEtapaAnterior} />
                <ButtonPadrao texto="Proximo" onClick={handleProximaEtapa} />
              </>
            )}

            {etapaAtual === 3 && (
              <>
                <label>Data</label>
                <DatePicker
                  selected={dataSelecionada}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                />

                <label>Hora:</label>
                <TimePicker
                  value={horaSelecionada}
                  onChange={handleTimeChange}
                  disableClock={true}
                />
                <ButtonPadrao texto="Voltar" onClick={handleEtapaAnterior} />
                <ButtonPadrao texto="Agendar!" tipo="submit" />
              </>
            )}
          </form>
        </div>
      </div>
      
    </section>
  );
};

export default Agendamento;
