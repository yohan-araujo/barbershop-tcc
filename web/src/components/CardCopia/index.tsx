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
        aoSelecionado ? 'bg-blue-100 border-2 border-green-500' : 'bg-gray-200'
      } w-72 rounded-lg`}
      onClick={handleClick}
    >
      <div
        className={`${
          aoSelecionado ? 'bg-green-500' : 'bg-gray-200'
        } rounded-lg flex justify-center`}
      >
        <img
          className="w-24 rounded-full relative bottom-[-3rem]"
          src={profissional.enderecoFoto}
          alt={profissional.nome}
        />
      </div>
      <div className="bg-white shadow-md rounded-sm pt-24 pb-10 text-center h-80">
        <h4 className="text-lg font-medium text-blue-300 mb-2">
          {profissional.nome}
        </h4>
        <p className="text-3xl font-medium text-black px-4 py-6">
          {profissional.descricao}
        </p>
      </div>
    </div>
  );
};

export default Card;
