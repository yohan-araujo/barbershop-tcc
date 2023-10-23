import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { IDadosGrafico } from 'types/IDadosGrafico';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoPie = () => {
  const [data, setData] = useState<any>(null); // Defina o tipo de dados como "any" ou um tipo apropriado

  const options = {
    responsive: true,
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

  useEffect(() => {
    // Faça uma requisição com o axios para sua API para obter os dados necessários
    axios.get(`http://localhost:3001/api/getServicosQtd`).then((response) => {
      const dataQtdServicos: IDadosGrafico[] = response.data;
      // Extrair os dados da resposta e formatá-los para o formato do gráfico de pizza
      const dadosParaGrafico = {
        labels: dataQtdServicos.map((item) => item.ser_tipo), // Substitua pelos seus tipos de serviço
        datasets: [
          {
            data: dataQtdServicos.map((item) => item.quantidade), // Substitua pelos dados reais
            backgroundColor: ['red', 'green', 'blue'], // Cores para as fatias do gráfico
          },
        ],
      };

      setData(dadosParaGrafico);
    });
  }, []);

  if (!data) {
    return null; // Renderize algo enquanto os dados estão sendo buscados
  }

  return (
    <div className="">
      {' '}
      <Pie data={data} options={options} />
    </div>
  );
};

export default GraficoPie;
