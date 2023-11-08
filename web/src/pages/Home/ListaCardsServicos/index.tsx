import CardHorizontal from '../CardHorizontal';
import { IServico } from 'types/IServico';
import CardServicos from '../CardServicos';

interface ListaCardsServicos {
  servicos: IServico[];
}

const ListaCardsServicos = ({ servicos }: ListaCardsServicos) => {
  return (
    <div className="flex justify-between my-8 px-52 flex-wrap">
      {servicos.map((servico) => (
        <CardServicos key={servico.ser_id} servico={servico} />
      ))}
    </div>
  );
};
export default ListaCardsServicos;
