import { IProfissional } from 'types/IProfissional';

interface CardProps {
  profissional: IProfissional;
  onClick: (id: number) => void;
  aoSelecionado: boolean;
}

const Card = ({ profissional, onClick, aoSelecionado }: CardProps) => {
  const handleClick = () => {
    onClick(profissional.id);
  };

  return (
    <div
      className={`${
        aoSelecionado ? 'bg-blue-200' : 'bg-white'
      } border border-gray-300 rounded-lg p-4 shadow-sm hover:bg-gray-100 cursor-pointer flex items-center`}
      onClick={handleClick}
    >
      <div className="flex-shrink-0">
        <img
          className="h-12 w-12 rounded-full"
          src={profissional.enderecoFoto}
          alt={profissional.nome}
        />
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-medium text-gray-900">
          {profissional.nome}
        </h4>
        <p className="text-sm font-medium text-gray-500">
          {profissional.descricao}
        </p>
      </div>
    </div>
  );
};

export default Card;
