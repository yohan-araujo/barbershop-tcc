import { FacebookIcon } from 'lucide-react';
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
    <div className="w-72 rounded-b-2xl" onClick={handleClick}>
      <div
        className="rounded-t-2xl flex justify-center"
        style={{ backgroundColor: profissional.usu_foto}}
      >
        <img
          className="w-24 rounded-full relative bottom-[-3rem]"
          src={profissional.usu_foto}
          alt={profissional.usu_nomeCompleto}
        />
        <input
          type="radio"
          className="absolute mt-3 ml-[15rem]"
          checked={aoSelecionado}
          readOnly
        />
      </div>
      <div className="bg-white shadow-md rounded-b-2xl pt-20 pb-10 text-center h-80">
        <h4 className="text-2xl font-bold  font-face-montserrat">
          {profissional.usu_nomeCompleto}
        </h4>
        <p className="text-xl font-normal text-black px-4 py-2 font-face-montserrat">
          {profissional.pro_descricao}
        </p>
        <div className="flex justify-center space-x-4 mt-5">
          <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex justify-center pincelcabelo-svg"></div>
          <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex justify-center maquinabarbear-svg"></div>
          <div className="w-8 h-8 rounded-full bg-[#D9D9D9] flex justify-center cortecabelo-svg"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
