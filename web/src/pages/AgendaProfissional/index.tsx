import { useEffect, useState } from "react";
import Calendario from "../../components/Calendario";
import { IAgendamento } from "types/IAgendamento";
import { Dayjs } from "dayjs";
import axios from "axios";
import { meses } from "json";
import MensagemFeedback from "components/MensagemFeedback";
import ListaHorariosClientes from "components/ListaHorariosClientes";

const AgendaProfissional: React.FC = () => {
  const [agendamentosDoDia, setAgendamentosDoDia] = useState<IAgendamento[]>(
    []
  );
  const [diaSelecionado, setDiaSelecionado] = useState<Dayjs | null>(null);
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
    subMessage: "",
  });

  useEffect(() => {
    if (diaSelecionado) {
      axios
        .get(
          `http://localhost:3001/api/getAgendamentos/${diaSelecionado.format(
            "YYYY-MM-DD"
          )}/${sessionStorage.getItem("proId")}`
        )
        .then((response) => {
          setAgendamentosDoDia(response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar os agendamentos:", error);
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
        "http://localhost:3001/api/atualizarStatusEPagamentoAgendamento",
        {
          agendamentoSelecionado: agendamentoId,
          formaPagamento: formaPagamento,
        }
      );
      setFeedback({
        type: "success",
        message: "Agendamento confirmado!",
        subMessage: "Status e pagamento atualizados com sucesso.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Erro ao confirmar o agendamento.",
        subMessage: "Tente novamente mais tarde.",
      });
      console.error("Erro ao confirmar agendamento:", error);
    }
  };

  return (
    <section className="flex bg-black min-h-screen justify-center">
      <div className="w-2/3 h-[48rem] bg-[#1D1D1D] my-24">
        <span className="flex justify-center uppercase text-[#E29C31] font-merriweather my-12 text-5xl">
          Agenda
        </span>
        <div className="grid grid-cols-2">
          <div>
            <div className="flex justify-center">
              <Calendario onDiaSelecionado={handleDiaSelecionado} />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            {diaSelecionado ? (
              <>
                <div className="text-center my-2 font-bold text-3xl">
                  <p className="text-white font-face-montserrat">
                    Agendados para: <br />
                    <span className="text-[#E29C31] font-face-montserrat">
                      {diaSelecionado.format("DD")} de{" "}
                      {meses[diaSelecionado.month()]}
                    </span>{" "}
                    de{" "}
                    <span className="text-[#E29C31] font-face-montserrat">
                      {diaSelecionado.year()}
                    </span>
                  </p>
                </div>

                {agendamentosDoDia.length > 0 ? (
                  <div className="flex justify-center">
                    <ListaHorariosClientes
                      agendamentos={agendamentosDoDia}
                      onConfirmarAgendamento={handleConfirmarAgendamento}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center mt-12">
                    <span className="text-4xl font-face-montserrat text-white font-bold uppercase text-center">
                      nenhum cliente <br />
                      registrado para o dia!
                    </span>
                  </div>
                )}

                {feedback.message && (
                  <MensagemFeedback
                    type={feedback.type as "failure" | "success"}
                    message={feedback.message}
                    subMessage={feedback.subMessage}
                    onClose={() =>
                      setFeedback({ type: "", message: "", subMessage: "" })
                    }
                  />
                )}
              </>
            ) : (
              <div className="flex justify-center">
                <span className="text-4xl font-face-montserrat text-[#E29C31] font-bold uppercase text-center">
                  escolha o <br />
                  profissional e o dia!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaProfissional;
