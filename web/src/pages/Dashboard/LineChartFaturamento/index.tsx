import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface FormattedData {
  name: string;
  faturamento?: number;
  projecao?: number;
}

const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="flex flex-row gap-2 justify-center pt-2">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center mt-2">
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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Dados do ponto no gráfico
    return (
      <div className="flex flex-col bg-black text-white px-2 py-2 rounded-sm border border-[#E29C31]">
        <p className="text-xl font-face-montserrat font-bold">
          Dia {data.name}
        </p>
        <p className="font-face-montserrat font-bold">
          Projeção:{' '}
          <span className="font-thin font-face-montserrat">
            R${data.projecao.toFixed(2)}
          </span>
        </p>
        <p className="font-face-montserrat font-bold">
          Faturamento:{' '}
          <span className="font-thin font-face-montserrat">
            R${data.faturamento.toFixed(2)}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

const LineChartFaturamento = () => {
  const [data, setData] = useState<FormattedData[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/getDadosFEP')
      .then((response) => {
        const { faturamento, projecao } = response.data;

        // Mapeando os dados para o formato necessário para o Recharts
        const formattedFaturamento: FormattedData[] = faturamento.map(
          (item: any) => ({
            name: format(new Date(item.data), 'dd/MM'), // Formatando a data para dd/mm
            faturamento: item.ganho_diario,
          })
        );

        const formattedProjecao: FormattedData[] = projecao.map(
          (item: any) => ({
            name: format(new Date(item.data), 'dd/MM'), // Formatando a data para dd/mm
            projecao: item.ganho_diario,
          })
        );

        const mergedData: FormattedData[] = formattedFaturamento.map(
          (item, index) => ({
            ...item,
            ...formattedProjecao[index],
          })
        );

        setData(mergedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col bg-black rounded-lg justify-center items-center">
        <span className="text-[#E29C31] text-3xl font-face-montserrat mt-4 px-4 font-bold">
          Faturamento e Projeção
          <hr className="border-[#E29C31] mt-4" />
        </span>
        <div className="px-12 py-4">
          <LineChart width={800} height={350} data={data}>
            <XAxis
              tickMargin={15}
              dataKey="name"
              tick={{ fontSize: 18, fill: 'white', fontFamily: 'Merriweater' }}
            />
            <YAxis
              tickMargin={10}
              tick={{
                fontFamily: 'Montserrat',
                fontSize: 18,
                fill: 'white',
              }}
            />
            <CartesianGrid strokeOpacity={0.2} />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <Line
              type="monotone"
              dataKey="faturamento"
              stroke="#E29C31"
              strokeWidth={2}
              dot={{ stroke: '#E29C31', strokeWidth: 2, fill: '#fff' }}
              name="Faturamento"
            />
            <Line
              type="monotone"
              dataKey="projecao"
              stroke="white"
              strokeWidth={2}
              dot={{ stroke: 'white', strokeWidth: 2, fill: '#fff' }}
              name="Projeção"
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default LineChartFaturamento;
