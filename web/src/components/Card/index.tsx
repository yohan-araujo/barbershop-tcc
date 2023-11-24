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
      className="flex flex-row w-[24rem] bg-black border-2 border-[#E29C31]"
      onClick={handleClick}
    >
      <div className="w-1/3">
        <img src="" alt="imagem profissional" />
      </div>
      <div className="w-1/3">
        <span className="text-white font-face-montserrat text-2xl font-bold">
          {profissional.usu_nomeCompleto}
        </span>
      </div>
      <div>aqui vao os servicos</div>
    </div>
  );
};

export default Card;
