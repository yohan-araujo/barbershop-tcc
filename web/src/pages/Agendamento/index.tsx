import InputPadrao from 'components/InputPadrao';
import ButtonPadrao from 'components/ButtonPadrao';
import ListaCards from './ListaCards';
import profissionais from '../../json/profissionais.json';
import TabelaServicos from './TabelaServicos';
import servicos from '../../json/servicos.json';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProfissional } from 'types/IProfissional';

const Agendamento = () => {
  const [listaProfissionais, setListaProfissionais] = useState<IProfissional[]>(
    []
  );

  useEffect(() => {
    axios
      .get<IProfissional[]>('http://localhost:3001/api/getProfissionais')
      .then((response) => {
        setListaProfissionais(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <>
      <section>
        <form action="" className="flex flex-col">
          <h1 className="mx-5 text-center text-5xl mt-5">
            Seleção do Profissional
          </h1>

          <ListaCards profissionais={listaProfissionais} />

          <h1 className="mx-5 text-center text-5xl mt-5">Seleção de serviço</h1>

          <TabelaServicos servicos={servicos} />

          <h1 className="mx-5 text-center text-5xl mt-5">
            Seleção de data e hora
          </h1>

          <InputPadrao
            labelTexto="Data"
            tipo="date"
            placeholder="Digite uma data"
          />
          <InputPadrao
            labelTexto="Hora"
            tipo="time"
            placeholder="Digite uma data"
          />

          <ButtonPadrao texto="Agendar!" />
        </form>
      </section>
    </>
  );
};

export default Agendamento;
