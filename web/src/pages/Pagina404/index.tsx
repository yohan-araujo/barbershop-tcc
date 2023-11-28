import ButtonPadrao from "components/ButtonPadrao";
import { Link } from "react-router-dom";

const Pagina404 = () => {
  return (
    <div className="grid items-center justify-center bg-black">
      <div className="flex relative">
        <h1 className="text-[32rem] font-lato text-[#FFFFFF] z-10">404</h1>
        <h1 className="text-[32rem] font-lato text-[#535353] absolute top-2 left-6">
          404
        </h1>
      </div>

      <div className="flex justify-center">
        <h2 className="font-merriweather font-semibold text-[#E29C31] text-5xl">
          Opa! Página não encontrada!
        </h2>
      </div>
      <div className="flex justify-center my-6">
        <h3 className="font-face-montserrat font-normal text-white text-3xl">
          Vá para a página inicial!
        </h3>
      </div>
      <div className="flex justify-center mb-24">
        <Link to="/">
          <ButtonPadrao texto="Pagina Inicial" />
        </Link>
      </div>
    </div>
  );
};

export default Pagina404;
