import { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import axios from 'axios';

interface PieChartTs {
  dados: number[];
}

const COLORS = ['black', '#E29C31', 'white', '#FF8042'];

// aqui eh o texto do hover

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Dados do ponto no gráfico
    return (
      <div className="flex flex-col bg-black text-white px-2 py-2 rounded-sm border border-[#E29C31]">
        <p className="text-xl font-face-montserrat font-bold">
          {data.name}:{' '}
          <span className="font-face-montserrat font-thin">{data.value}</span>
        </p>
      </div>
    );
  }

  return null;
};

// aqui edita a legenda

const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="flex flex-row gap-2 justify-center">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center">
          <span
            className="inline-block w-4 h-4 rounded-full mr-2 border border-[#e29c31]"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="font-face-montserrat text-white">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

//aqui edita o texto do meio se for mexer na posicao dele, tem que mexer no valor da linha 78 e 79

const textStyle = {
  fontSize: '10px',
  fontWeight: 'bold',
  fill: '#E29C31',
  fontFamily: 'montserrat',
};

const PieChartTS = ({ dados }: PieChartTs) => {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col bg-black rounded-lg justify-center items-center">
        <span className="text-[#E29C31] text-3xl font-face-montserrat mt-4 px-4 font-bold ">
          Tipos de serviços
          <hr className="border-[#E29C31] mt-4" />
        </span>

        <PieChart width={400} height={300}>
          <text
            x={200}
            y={140}
            textAnchor="middle"
            dominantBaseline="middle"
            style={textStyle}
          >
            Qual serviço mais escolhido?
          </text>
          <Pie
            data={dados}
            innerRadius={80}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            animationBegin={300}
            animationEasing="ease-out" // Tipo de easing
          >
            {dados.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartTS;
