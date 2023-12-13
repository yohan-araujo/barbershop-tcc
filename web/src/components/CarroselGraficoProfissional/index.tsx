import ButtonPadrao from 'components/ButtonPadrao';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarroselGraficoProps {
  charts: JSX.Element[];
}

const CarrosselGraficoProfissional = ({ charts }: CarroselGraficoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevChart = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? charts.length - 1 : prevIndex - 1
    );
  };

  const nextChart = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === charts.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="">
      <div className="flex flex-row mt-4 justify-center space-x-5">
        <ChevronLeft
          className="text-white cursor-pointer mt-40"
          onClick={prevChart}
        />
        <div>{charts[currentIndex]}</div>
        <ChevronRight
          className="text-white cursor-pointer mt-40"
          onClick={nextChart}
        />
      </div>
    </div>
  );
};

export default CarrosselGraficoProfissional;
