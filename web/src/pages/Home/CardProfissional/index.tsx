import { useState } from 'react';
import { IProfissional } from 'types/IProfissional';
import NavalhaIcon from 'assets/navalha-icon.svg'

interface CardProfissionalProps {
  profissional: IProfissional;
}

const CardProfissional = ({ profissional }: CardProfissionalProps) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className="w-full md:w-[20rem] p-4 md:mr-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col border border-orange-400 h-full">
        <div className="relative">
          <img
            src={profissional.usu_foto}
            alt="foto do profissional"
            className="w-full h-72 object-cover"
            loading="lazy"
          />
          {hovered && (
            <div className=" flex flex-col absolute inset-0 bg-black opacity-90  justify-center items-center text-white">
              <p className="text-center font-bold text-base text-opacity-100 font-face-montserrat text-orange-400">
                Skills
              </p>
              <div className="flex flex-row items-start border-2">
                <img src={NavalhaIcon} alt="icone tesoura" className='w-8 h-8'/>
                <p className="text-xs font-face-montserrat">Barba</p>
              </div>
            </div>
          )}
        </div>
        <div
          className={`flex flex-col text-white p-4 h-full text-center gap-6 ${
            hovered ? 'text-opacity-10' : ''
          }`}
        >
          <h1 className="text-xl font-semibold  font-face-montserrat">
            {profissional.usu_nomeCompleto}
          </h1>
          <p
            className={`text-white font-face-montserrat ${
              hovered ? 'text-opacity-10' : ''
            }`}
          >
            Barbeiro
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardProfissional;
