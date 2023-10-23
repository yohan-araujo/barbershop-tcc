import ButtonPadrao from 'components/ButtonPadrao';
import { useState } from 'react';

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
      <div>{charts[currentIndex]}</div>
      <div className="flex flex-row mt-4 justify-center space-x-5">
        <ButtonPadrao texto="Anterior" onClick={prevChart} />
        <ButtonPadrao texto="Próximo" onClick={nextChart} />
      </div>
    </div>
  );
};

export default CarrosselGraficoProfissional;
