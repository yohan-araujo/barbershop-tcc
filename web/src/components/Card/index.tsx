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

  const urlImagem = `http://localhost:3001/uploads/Profissionais/${profissional.usu_id}/${profissional.usu_foto}`;

  return (
    <div
      className="flex flex-row w-[24rem] bg-black border-2 border-[#E29C31] px-12 py-2"
      onClick={handleClick}
    >
      <div className="w-1/3">
        <img
          src={urlImagem}
          alt="imagem profissional"
          className="rounded-full w-24 h-24"
        />
      </div>
      <div className="w-1/3">
        <span className="text-white font-face-montserrat text-2xl font-bold">
          {profissional.usu_nomeCompleto}
        </span>
      </div>
      <div className="text-white">aqui vao os servicos</div>
    </div>
  );
};

export default Card;
