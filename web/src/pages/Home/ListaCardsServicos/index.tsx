import CardHorizontal from "../CardProfissional";
import { IServico } from "types/IServico";
import CardServicos from "../CardServicos";

interface ListaCardsServicos {
  servicos: IServico[];
}

const ListaCardsServicos = ({ servicos }: ListaCardsServicos) => {
  return (
    <div className="flex justify-center gap-8 flex-wrap">
      {servicos.map((servico) => (
        <CardServicos key={servico.ser_id} servico={servico} />
      ))}
    </div>
  );
};
export default ListaCardsServicos;
