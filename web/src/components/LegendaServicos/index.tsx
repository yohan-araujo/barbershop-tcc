import { FacebookIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const LegendaServicos = () => {
  return (
    <div className="flex flex-col">
      <div className="ml-16 border-l-2">
        <h1 className="text-4xl font-bold ml-3 font-face-montserrat">
          Profissionais
        </h1>
      </div>
      <div className="flex items-center justify-center mt-12">
        <div className="flex flex-row w-2/3 h-16 bg-blue-white rounded-full shadow-2xl justify-between px-24 py-2">
          <div className="flex flex-row">
            <div className="w-12 h-12 rounded-xl bg-[#d9d9d9] flex justify-center">
              <div className="flex flex-row items-center">
                <FacebookIcon />
              </div>
            </div>
            <span className="ml-4 mt-2 font-face-montserrat text-2xl">
              Texto 1
            </span>
          </div>
          <div className="flex flex-row">
            <div className="w-12 h-12 rounded-lg bg-[#d9d9d9] flex justify-center">
              <div className="flex flex-row items-center">
                <FacebookIcon />
              </div>
            </div>
            <span className="ml-4 mt-2 font-face-montserrat text-2xl">
              Texto 1
            </span>
          </div>
          <div className="flex flex-row">
            <div className="w-12 h-12 rounded-lg bg-[#d9d9d9] flex justify-center">
              <div className="flex flex-row items-center">
                <FacebookIcon />
              </div>
            </div>
            <span className="ml-4 mt-2 font-face-montserrat text-2xl">
              Texto 1
            </span>
          </div>
          <div className="flex flex-row">
            <div className="w-12 h-12 rounded-lg bg-[#d9d9d9] flex justify-center">
              <div className="flex flex-row items-center">
                <FacebookIcon />
              </div>
            </div>
            <span className="ml-4 mt-2 font-face-montserrat text-2xl">
              Texto 1
            </span>
          </div>
          <div className="flex flex-row">
            <div className="w-12 h-12 rounded-lg bg-[#d9d9d9] flex justify-center">
              <div className="flex flex-row items-center">
                <FacebookIcon />
              </div>
            </div>
            <span className="ml-4 mt-2 font-face-montserrat text-2xl">
              Texto 1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegendaServicos;
