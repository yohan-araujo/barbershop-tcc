import { IProfissional } from 'types/IProfissional';
import CardHorizontal from '../CardHorizontal';

interface ListaCardsHorizontaisProps {
  profissionais: IProfissional[];
}

const ListaCardsHorizontais = ({
  profissionais,
}: ListaCardsHorizontaisProps) => {
  return (
    <div className="flex justify-between my-8 px-52 flex-wrap">
      {profissionais.map((profissional) => (
        <CardHorizontal key={profissional.pro_id} profissional={profissional} />
      ))}
    </div>
  );
};
export default ListaCardsHorizontais;
