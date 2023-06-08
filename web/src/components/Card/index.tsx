import { useEffect } from 'react';
import { IProfissional } from 'types/IProfissional';

interface CardProps {
  profissional: IProfissional;
  onClick: (id: number) => void;
  aoSelecionado: boolean;
}

const Card = ({ profissional, onClick, aoSelecionado }: CardProps) => {
  const handleClick = () => {
    onClick(profissional.usu_id);
  };

  return (
    <div
      className={`${
        aoSelecionado
          ? 'bg-blue-100 border-2 border-green-500'
          : `bg-blue-100 border-2`
      } w-72 rounded-lg`}
      onClick={handleClick}
    >
      <div
        className={`${
          aoSelecionado ? 'bg-green-500' : `bg-[${profissional.pro_cor}]`
        } rounded-t-lg flex justify-center`}
      >
        <img
          className="w-24 rounded-full relative bottom-[-3rem]"
          src={profissional.usu_foto}
          alt={profissional.usu_nomeCompleto}
        />
      </div>
      <div className="bg-white shadow-md rounded-sm pt-20 pb-10 text-center h-80">
        <h4 className="text-2xl font-bold  font-face-montserrat">
          {profissional.usu_nomeCompleto}
        </h4>
        <p className="text-xl font-normal text-black px-4 py-2 font-face-montserrat">
          {profissional.pro_descricao}
        </p>
      </div>
    </div>
  );
};

export default Card;
