import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { IDadosGrafico } from 'types/IDadosGrafico';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        color: 'white',
      },
      ticks: {
        color: 'white',
      },
    },
    y: {
      grid: {
        color: 'white',
      },
      ticks: {
        color: 'white',
      },
      suggestedMin: 0,
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          size: 24, // Tamanho da fonte da legenda
        },
        color: 'white', // Cor do texto da legenda
      },
    },
  },
};

const GraficoLine = () => {
  const [faturamento, setFaturamento] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: 'Faturamento',
        data: [],
        borderColor: '#0064B1',
        backgroundColor: '#0064B1',
        borderWidth: 5,
      },
    ],
  });

  const [projecao, setProjecao] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      borderWidth: number;
      borderDash: number[];
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: 'Projeção',
        data: [],
        borderColor: '#FF5733',
        backgroundColor: '#FF5733',
        borderWidth: 2,
        borderDash: [5, 5], // Adicione uma linha tracejada para a projeção
      },
    ],
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/getFaturamento`).then((response) => {
      const dataFaturamento: IDadosGrafico[] = response.data;
      console.log(response.data);
      const datasFormatadas = dataFaturamento.map((item) =>
        format(new Date(item.data), 'dd/MM')
      );

      // Atualize as labels e dados do faturamento.
      const newDataFaturamento = {
        labels: datasFormatadas,
        datasets: [
          {
            label: 'Faturamento',
            data: dataFaturamento.map((item) => item.ganho_diario),
            borderColor: '#0064B1',
            backgroundColor: '#0064B1',
            borderWidth: 2,
          },
        ],
      };
      setFaturamento(newDataFaturamento);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getProjecaoFaturamento`)
      .then((response) => {
        const dataProjecao: IDadosGrafico[] = response.data;

        const datasFormatadas = dataProjecao.map((item) =>
          format(new Date(item.data), 'dd/MM')
        );

        // Atualize as labels e dados da projeção.
        const newDataProjecao = {
          labels: datasFormatadas,
          datasets: [
            {
              label: 'Projeção',
              data: dataProjecao.map((item) => item.ganho_diario),
              borderColor: '#FF5733',
              backgroundColor: '#FF5733',
              borderWidth: 2,
              borderDash: [5, 5],
            },
          ],
        };
        setProjecao(newDataProjecao);
      });
  }, []);

  return (
    <div className="h-[16rem] w-[32rem]">
      <Line
        options={options}
        data={{
          labels: faturamento.labels, // Use as labels do faturamento
          datasets: [...faturamento.datasets, ...projecao.datasets], // Combine os datasets
        }}
      />
    </div>
  );
};

export default GraficoLine;
