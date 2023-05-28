import ButtonPadrao from 'components/ButtonPadrao';
import ListaCards from './ListaCards';
import TabelaServicos from './TabelaServicos';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProfissional } from 'types/IProfissional';
import { IServico } from 'types/IServico';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';

const Agendamento = () => {
  const [listaProfissionais, setListaProfissionais] = useState<IProfissional[]>(
    []
  );
  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState<IProfissional | null>(null);
  const [listaServicos, setListaServicos] = useState<IServico[]>([]);
  const [servicoSelecionado, setServicolSelecionado] =
    useState<IServico | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);

  //Trazendo informação do banco
  useEffect(() => {
    axios
      .get<IProfissional[]>('http://localhost:3001/api/getProfissionais')
      .then((response) => {
        setListaProfissionais(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get<IServico[]>('http://localhost:3001/api/getServicos')
      .then((response) => {
        setListaServicos(response.data);
      });
  }, []);

  // Selecao de profissional e de servico

  const handleProfissionalSelecionado = (profissional: IProfissional) => {
    setProfissionalSelecionado(profissional);
  };

  const handleServicoSelecionado = (servico: IServico) => {
    setServicolSelecionado(servico);
  };

  // Colocando a data e hora pra funcionar

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDataSelecionada(date);
    }
  };

  const handleTimeChange = (time: string | null) => {
    setHoraSelecionada(time);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Servico Selecionado: ', servicoSelecionado);
    console.log('Profissional selecionado:', profissionalSelecionado);
    console.log('Data:', dataSelecionada);
    console.log('Hora:', horaSelecionada);

    if (
      dataSelecionada &&
      horaSelecionada &&
      profissionalSelecionado &&
      servicoSelecionado
    ) {
      const dataFormatada = format(dataSelecionada, 'yyyy-MM-dd');
      axios
        .post('http://localhost:3001/api/insertAgendamento', {
          data: dataFormatada,
          hora: horaSelecionada,
          profissionalID: profissionalSelecionado.pro_id,
          servicoID: servicoSelecionado.ser_id,
        })
        .then((response) => {
          console.log('Agendamento inserido com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao inserir agendamento:', error);
        });
    }
  };
  return (
    <>
      <section>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h1 className="mx-5 text-center text-5xl mt-5">
            Seleção do Profissional
          </h1>

          <ListaCards
            profissionais={listaProfissionais}
            onProfissionalSelecionado={handleProfissionalSelecionado}
          />

          <h1 className="mx-5 text-center text-5xl mt-5">Seleção de serviço</h1>

          <TabelaServicos
            servicos={listaServicos}
            onServicoSelecionado={handleServicoSelecionado}
          />

          <h1 className="mx-5 text-center text-5xl mt-5">
            Seleção de data e hora
          </h1>

          <label>Data</label>
          <DatePicker
            selected={dataSelecionada}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
          />

          <label>Hora:</label>
          <TimePicker
            value={horaSelecionada}
            onChange={handleTimeChange}
            disableClock={true}
          />

          <ButtonPadrao texto="Agendar!" tipo="submit" />
        </form>
      </section>
    </>
  );
};

export default Agendamento;
