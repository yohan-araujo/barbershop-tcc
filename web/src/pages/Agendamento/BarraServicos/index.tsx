import SobrancelhaIcon from 'assets/icon-sobrancelha.svg';
import NavalhaIcon from 'assets/icon-navalha.svg';
import PincelIcon from 'assets/icon-pincel.svg';
import TesouraIcon from 'assets/icon-tesoura.svg';

const BarraServicos = () => {
  return (
    <div className="relative">
      <div className="absolute top-2 left-3 h-[5rem] w-[64rem] border-2 border-[#E29C31] rounded-2xl"></div>
      <div className="relative w-[64rem] h-[4.5rem] bg-[#3B3B3B] shadow-md rounded-2xl px-4 py-2 z-10">
        <div className="flex flex-row justify-center gap-[6rem] px-5">
          <div className="flex items-center">
            <div className="w-14 h-14 bg-black rounded-full">
              <img src={NavalhaIcon} alt="barbeador" className="p-2" />
            </div>
            <h3 className="font-face-montserrat font-semibold text-xl text-white ml-2">
              Barba
            </h3>
          </div>
          <div className="flex items-center">
            <div className="w-14 h-14 bg-black rounded-full">
              <img src={PincelIcon} alt="" className="p-2" />
            </div>
            <h3 className="font-face-montserrat font-semibold text-xl text-white ml-2">
              Tintura
            </h3>
          </div>
          <div className="flex items-center">
            <div className="w-14 h-14 bg-black rounded-full">
              <img src={TesouraIcon} alt="" className="p-2" />
            </div>
            <h3 className="font-face-montserrat font-semibold text-xl text-white ml-2">
              Corte
            </h3>
          </div>
          <div className="flex items-center">
            <div className="w-14 h-14 bg-black rounded-full">
              <img src={SobrancelhaIcon} alt="" className="p-2" />
            </div>
            <h3 className="font-face-montserrat font-semibold text-xl text-white ml-2">
              Sobrancelha
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarraServicos;
