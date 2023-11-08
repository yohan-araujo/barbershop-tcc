import { IProfissional } from 'types/IProfissional';

interface CardHorizontalProps {
  profissional: IProfissional;
}

const CardHorizontal = ({ profissional }: CardHorizontalProps) => {
  return (
    <div className="w-full md:w-[15rem] p-4 md:mr-2">
      <div className="flex flex-col border border-orange-400 h-full">
        <div className="relative">
          <img
            src={profissional.usu_foto}
            alt="foto do profissional"
            className="w-full h-72 object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col p-4 h-full text-center gap-6">
          <h1 className="text-xl font-semibold text-white font-face-montserrat">
            {profissional.usu_nomeCompleto}
          </h1>
          <p className="text-white font-face-montserrat">Barbeiro</p>
        </div>
      </div>
    </div>
  );
};

export default CardHorizontal;

{
  /* <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
  <div className="space-x-2 flex text-sm">
    <label>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white cortecabelo-svg"></div>
    </label>
    <label>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white maquinabarbear-svg"></div>
    </label>
    <label>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white pincelcabelo-svg"></div>
    </label>
    <label>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white sobrancelhas-svg"></div>
    </label>
    <label>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white crianca-svg"></div>
    </label>
  </div>
</div> */
}
{
  /* <div className="flex space-x-4 mb-6 text-sm font-medium">
  <p className="text-xl text-slate-700 font-face-montserrat">
    {profissional.pro_descricao}
  </p>
</div> */
}
