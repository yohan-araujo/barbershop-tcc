import { useState } from 'react';
import GraficoPie from '../GraficoPie';
import GraficoLine from '../GraficoLine';

const CarroselGrafico = () => {
  const [periodo, setPeriodo] = useState<String>('diario');
  const [dadosGraficoLine, setDadosGraficoLine] = useState();
  const [dadosGraficoPie, setDadosGraficoPie] = useState();

  return (
    <div>
      <div>
        <button onClick={() => setPeriodo('diario')}>Diário</button>
        <button onClick={() => setPeriodo('mensal')}>Mensal</button>
        <button onClick={() => setPeriodo('anual')}>Anual</button>
      </div>
      <div>
        {periodo === 'diario' && <GraficoPie data={dadosGraficoPie} />}
        {periodo === 'mensal' && <GraficoPie data={dadosGraficoPie} />}
        {periodo === 'anual' && <GraficoLine data={dadosGraficoLine} />}
      </div>
    </div>
  );
};

export default CarroselGrafico;
