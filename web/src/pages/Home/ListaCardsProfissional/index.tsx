import { IProfissional } from 'types/IProfissional';
import CardProfissional from '../CardProfissional';

interface ListaCardsProfissionalProps {
  profissionais: IProfissional[];
}

const ListaCardsProfissional = ({
  profissionais,
}: ListaCardsProfissionalProps) => {
  return (
    <div className="flex justify-center gap-12 my-8 px-52 flex-wrap">
      {profissionais.map((profissional) => (
        <CardProfissional
          key={profissional.pro_id}
          profissional={profissional}
        />
      ))}
    </div>
  );
};
export default ListaCardsProfissional;
