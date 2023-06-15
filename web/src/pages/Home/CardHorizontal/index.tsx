import { IProfissional } from 'types/IProfissional';
import { Scissors } from 'lucide-react';

interface CardHorizontalProps {
  profissional: IProfissional;
}

const CardHorizontal = ({ profissional }: CardHorizontalProps) => {
  return (
    <div className="flex shadow-xl rounded mb-24">
      <div className="flex-none w-48 relative">
        <img
          src={profissional.usu_foto}
          alt="foto do profissional"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <form className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-2xl font-semibold text-slate-900 font-face-montserrat">
            {profissional.usu_nomeCompleto}
          </h1>
        </div>
        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
          <div className="space-x-2 flex text-sm">
            <label>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                <Scissors />
              </div>
            </label>
            <label>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                <Scissors />
              </div>
            </label>
            <label>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                <Scissors />
              </div>
            </label>
            <label>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                <Scissors />
              </div>
            </label>
            <label>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                <Scissors />
              </div>
            </label>
          </div>
        </div>
        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <p className="text-xl text-slate-700 font-face-montserrat">
            {profissional.pro_descricao}
          </p>
        </div>
      </form>
    </div>
  );
};

export default CardHorizontal;
