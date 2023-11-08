import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarroselProps {
  imagens: string[];
}

const Carrosel = ({ imagens }: CarroselProps) => {
  const [indexAtual, setIndexAtual] = useState(0);

  const handleAnterior = () => {
    setIndexAtual((indexAnterior) =>
      indexAnterior === 0 ? imagens.length - 1 : indexAnterior - 1
    );
  };

  const handleProximo = () => {
    setIndexAtual((indexAnterior) =>
      indexAnterior === imagens.length - 1 ? 0 : indexAnterior + 1
    );
  };

  return (
    <div className="relative">
      <div className="max-w-screen">
        <img
          src={imagens[indexAtual]}
          alt="Carousel"
          className="w-full h-full"
        />        
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center">
          <button
            onClick={handleAnterior}
            className="flex items-center justify-center w-8 h-8  ml-4"
          >
            <ChevronLeft className="text-white" />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center">
          <button
            onClick={handleProximo}
            className="flex items-center justify-center w-8 h-8 mr-4"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
      <div className="flex mx-4 justify-center absolute bottom-0 left-0 right-0 mb-4">
        {imagens.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === indexAtual ? 'bg-orange-400' : 'bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrosel;
