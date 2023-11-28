import ButtonPadrao from 'components/ButtonPadrao';
import { Link } from 'react-router-dom';
import GifRobo from 'assets/img/gif-robo.gif';

const Pagina404 = () => {
  return (
    <div className="grid grid-cols-2 items-center justify-center bg-black min-h-screen">
      <div className="flex flex-col text-center">
        <h2 className="font-merriweather font-semibold text-[#E29C31] text-5xl uppercase text-left ml-32">
          página não <br /> encontrada!
        </h2>

        <div className="flex justify-center my-6">
          <h3 className="font-face-montserrat font-normal text-white text-3xl text-left w-[44rem]">
            A página que você procura não existe. <br /> Tente novamente ou
            volte para a página <br /> principal!
          </h3>
        </div>
        <div className="flex justify-start ml-32">
          <Link to="/">
            <ButtonPadrao texto="Página Inicial" outline={true} />
          </Link>
        </div>
      </div>
      <div className="flex">
        <img src={GifRobo} alt="gif do robo" className="h-[48rem] w-[48rem]" />
      </div>
    </div>
  );
};

export default Pagina404;
