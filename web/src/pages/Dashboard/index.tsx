import { useEffect, useState } from 'react';
import LineChartFaturamento from '../../components/LineChartFaturamento';
import PieChartFP from '../../components/PieChartFP';
import PieChartTS from '../../components/PieChartTS';
import axios from 'axios';
import { format } from 'date-fns';
import { IDadosFormatados } from 'types/IDadosFormatados';
import DropdownFiltro from './DropdownFiltro';
import DropdownProfissional from './DropdownProfissional';
import { IProfissional } from 'types/IProfissional';

const Dashboard = () => {
  const [dadosFp, setDadosFp] = useState([]);
  const [dadosTs, setDadosTs] = useState([]);
  const [dadosFep, setDadosFep] = useState<IDadosFormatados[]>([]);
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>('');
  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState<IProfissional>();

  const handleFilterSelect = (selectedOption: string) => {
    setFiltroSelecionado(selectedOption);
    console.log('Opção selecionada:', selectedOption);
  };

  const handleProfissionalSelecionado = (
    profissionalSelecionado: IProfissional
  ) => {
    setProfissionalSelecionado(profissionalSelecionado);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/getDadosFP?filtro=${filtroSelecionado}&pro_id=${
          profissionalSelecionado?.pro_id || ''
        }`
      )
      .then((response) => {
        const formattedData = response.data.map((item: any) => ({
          name: item.age_pagamento,
          value: item.count,
        }));
        setDadosFp(formattedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, [filtroSelecionado, profissionalSelecionado]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/getDadosTS?filtro=${filtroSelecionado}&pro_id=${
          profissionalSelecionado?.pro_id || ''
        }`
      )
      .then((response) => {
        const formattedData = response.data.map((item: any) => ({
          name: item.ser_tipo,
          value: item.quantidade,
        }));
        setDadosTs(formattedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, [filtroSelecionado, profissionalSelecionado]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/getDadosFEP?filtro=${filtroSelecionado}&pro_id=${
          profissionalSelecionado?.pro_id || ''
        }`
      )
      .then((response) => {
        const { faturamento, projecao } = response.data;

        const formattedFaturamento: IDadosFormatados[] = faturamento.map(
          (item: any) => ({
            name: format(new Date(item.data), 'dd/MM'),
            faturamento: item.ganho_diario,
          })
        );

        const formattedProjecao: IDadosFormatados[] = projecao.map(
          (item: any) => ({
            name: format(new Date(item.data), 'dd/MM'),
            projecao: item.ganho_diario,
          })
        );

        const mergedData: IDadosFormatados[] = formattedFaturamento.map(
          (item, index) => ({
            ...item,
            ...formattedProjecao[index],
          })
        );

        setDadosFep(mergedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, [filtroSelecionado, profissionalSelecionado]);

  return (
    <div className="flex justify-center bg-black min-h-screen">
      <div className="w-2/3 h-[80rem] bg-[#1D1D1D]">
        <div className="flex justify-center my-12 ">
          <span className="text-[#E29C31] text-5xl font-merriweather uppercase">
            Dashboard
          </span>
        </div>
        <div className="flex justify-start ml-28 gap-4">
          <DropdownFiltro onSelectFilter={handleFilterSelect} />
          <DropdownProfissional
            aoSelecionarProfissional={handleProfissionalSelecionado}
          />
        </div>
        <div className="grid grid-cols-2 mt-12">
          <div className="">
            <PieChartFP key={new Date().getTime()} dados={dadosFp} />
          </div>
          <div>
            <PieChartTS key={new Date().getTime()} dados={dadosTs} />
          </div>
        </div>
        <div className="flex flex-col text-center mt-12">
          <span className="text-[#E29C31] text-5xl font-merriweather uppercase">
            Faturamento
          </span>
          <div className="my-12">
            {' '}
            <LineChartFaturamento key={new Date().getTime()} dados={dadosFep} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
