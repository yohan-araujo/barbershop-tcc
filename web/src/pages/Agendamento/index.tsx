import ButtonPadrao from 'components/ButtonPadrao';
import ListaCards from './ListaCards';
import TabelaServicos from './TabelaServicos';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProfissional } from 'types/IProfissional';
import { IServico } from 'types/IServico';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';

const Agendamento = () => {
  const [listaProfissionais, setListaProfissionais] = useState<IProfissional[]>(
    []
  );
  const [listaServicos, setListaServicos] = useState<IServico[]>([]);
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

  //Colocando a data e hora pra funcionar

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

    // Aqui você pode enviar os dados do agendamento para o servidor
    console.log('Data:', dataSelecionada);
    console.log('Hora:', horaSelecionada);
  };
  return (
    <>
      <section>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h1 className="mx-5 text-center text-5xl mt-5">
            Seleção do Profissional
          </h1>

          <ListaCards profissionais={listaProfissionais} />

          <h1 className="mx-5 text-center text-5xl mt-5">Seleção de serviço</h1>

          <TabelaServicos servicos={listaServicos} />

          <h1 className="mx-5 text-center text-5xl mt-5">
            Seleção de data e hora
          </h1>

          <label htmlFor="">Data</label>
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
