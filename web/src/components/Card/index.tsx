import { IProfissional } from 'types/IProfissional';
import SobrancelhaIcon from 'assets/icon-sobrancelha.svg';
import NavalhaIcon from 'assets/icon-navalha.svg';
import PincelIcon from 'assets/icon-pincel.svg';
import TesouraIcon from 'assets/icon-tesoura.svg';

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
      className={`flex flex-row w-[36rem] h-[6rem]  py-2 ${
        aoSelecionado
          ? 'bg-[#E29C31] border-2 border-black'
          : 'bg-black border-2 border-[#E29C31] text-white'
      }`}
      onClick={handleClick}
    >
      <div className="grid grid-cols-3 ">
        <div className="ml-12">
          <div>
            <img
              src={urlImagem}
              alt="imagem profissional"
              className="h-20 rounded-full"
            />
          </div>
        </div>
        <div className="flex gap-0">
          <div className="mt-5">
            <span className="font-face-montserrat text-2xl font-bold uppercase">
              {profissional.usu_nomeCompleto}
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-start gap-2">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full ${
                aoSelecionado ? 'bg-black' : 'bg-white '
              }`}
            >
              <img src={NavalhaIcon} alt="barbeador" className="p-2" />
            </div>
          </div>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full ${
                aoSelecionado ? 'bg-black' : 'bg-white '
              }`}
            >
              <img src={PincelIcon} alt="" className="p-2" />
            </div>
          </div>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full ${
                aoSelecionado ? 'bg-black' : 'bg-white '
              }`}
            >
              <img src={TesouraIcon} alt="" className="p-2" />
            </div>
          </div>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full ${
                aoSelecionado ? 'bg-black' : 'bg-white '
              }`}
            >
              <img src={SobrancelhaIcon} alt="" className="p-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
