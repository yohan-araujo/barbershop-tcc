import { IServico } from 'types/IServico';

interface CardServicosProps {
  servico: IServico;
}

const CardServicos = ({ servico }: CardServicosProps) => {
  return (
    <div className="w-full md:w-[20rem] p-4 md:mr-2">
      <div className="flex flex-col border border-orange-400 h-full">
        <div className="relative">
          <img
            src="https://picsum.photos/200/300"
            alt="foto do servico"
            className="w-full h-72 object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col p-4 h-full text-center gap-6">
          <h1 className="text-xl font-semibold text-white font-face-montserrat">
            {servico.ser_tipo}
          </h1>
          <p className="text-white font-face-montserrat">Barbeiro</p>
        </div>
      </div>
    </div>
  );
};

export default CardServicos;
