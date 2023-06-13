import { Home } from "lucide-react";

const Pagina404 = () => {
  return (
    <div className="grid items-center justify-center bg-[#414141]">
      <div className="flex">
        <h1 className="text-[420px] font-lato text-[#FFFFFF] opacity-5">404</h1>
      </div>
      <div className="flex justify-center">
        <h2 className="font-montserrat font-semibold text-white text-[44px]">
          Opa! Página não encontrada!
        </h2>
      </div>
      <div className="flex justify-center">
        <h3 className="font-montserrat font-normal text-white text-[30px]">
          Vá para a página inicial!
        </h3>
      </div>
      <div className="flex justify-center border border-blue-500 border-solid  my-14 w-[255px] h-[53px]">
      {/* <ButtonPadrao texto="Voltar" onClick={handleHome} /> */}
      </div>
    </div>
  );
};

export default Pagina404;
