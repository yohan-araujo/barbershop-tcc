import { useState } from "react";
import { IServico } from "types/IServico";
import TesouraIcon from "../../../assets/icon-tesoura.svg";
import NavalhaIcon from "../../../assets/icon-navalha.svg";
import SobrancelhaIcon from "../../../assets/icon-sobrancelha.svg";
import PincelIcon from "../../../assets/icon-pincel.svg";

interface TabelaServicosProps {
  servicos: IServico[];
  onServicoSelecionado: (servico: IServico) => void;
}

const iconsMap: { [key: number]: any } = {
  1: TesouraIcon,
  2: NavalhaIcon,
  3: SobrancelhaIcon,
  4: PincelIcon,
};

const TabelaServicos = ({
  servicos,
  onServicoSelecionado,
}: TabelaServicosProps) => {
  const [servicoSelecionado, setServicoSelecionado] = useState<IServico | null>(
    null
  );

  const handleServicoSelecionado = (servico: IServico) => {
    setServicoSelecionado((servicoSelecionadoAntigo) => {
      if (servicoSelecionadoAntigo === servico) {
        return null;
      }
      return servico;
    });
    onServicoSelecionado(servico);
  };

  return (
    <div className="w-[48rem] cursor-pointer my-6">
      {servicos.map((servico) => (
        <div
          key={servico.ser_id}
          className={`h-20 border-2 my-8 ${
            servicoSelecionado === servico
              ? "bg-[#E29C31] border-black"
              : "bg-black border-[#E29C31] text-white"
          }`}
          onClick={() => handleServicoSelecionado(servico)}
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-row px-2 ml-4 gap-3">
              <div
                className={`flex w-12 h-12 rounded-full mt-3 ${
                  servicoSelecionado === servico
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                <img
                  src={iconsMap[servico.ser_id]}
                  alt="icone"
                  className="p-2"
                />
              </div>
              <div className="flex text-2xl font-face-montserrat uppercase font-bold mt-5 ">
                {servico.ser_tipo}
              </div>
            </div>

            <div className="flex font-bold mt-5 mr-4">
              <span className="font-face-montserrat text-2xl">
                {" "}
                R${servico.ser_preco.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabelaServicos;
