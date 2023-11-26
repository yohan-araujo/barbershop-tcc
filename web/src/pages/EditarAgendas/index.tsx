import { useEffect, useState } from 'react';
import ProfissionaisSelect from './ProfissionaisSelect';
import { IProfissional } from 'types/IProfissional';
import axios from 'axios';
import { IAgendamento } from 'types/IAgendamento';
import AgendaProfissional from './TabelaAgenda';

const EditarAgendas = () => {
  const [profissionais, setProfissionais] = useState<IProfissional[]>([]);
  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState<IProfissional>();
  const [agenda, setAgenda] = useState<IAgendamento[]>([]);

  useEffect(() => {
    axios
      .get<IProfissional[]>(`http://localhost:3001/api/getProfissionais`)
      .then((response) => {
        setProfissionais(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get<IAgendamento[]>(
        `http://localhost:3001/api/getAgendamentos/${profissionalSelecionado?.pro_id}`
      )
      .then((response) => {
        setAgenda(response.data);
      });
  }, [profissionalSelecionado]);

  const handleProfissionalSelecionado = (profissional: IProfissional) => {
    setProfissionalSelecionado(profissional);
  };

  return (
    <section className="flex min-h-screen bg-black">
      <div className='flex flex-auto justify-center items-center'>
        <div className='relative'>
          <div className="border-2 absolute left-2 top-2 w-[43rem] h-[26.7rem] border-[#E29C31]" />
          <div className="flex flex-col relative z-10 bg-[#1D1D1D]">
            <span className="text-center text-[#E29C31] text-6xl font-bold font-merriweather my-12">
              Editar Agendas
            </span>
            <div className="flex m-auto">
              <ProfissionaisSelect
                profissionais={profissionais}
                onProfissionalSelect={handleProfissionalSelecionado}
              />
            </div>
            w
            <div className="flex-auto mt-16 p-5">
              {profissionalSelecionado ? (
                <AgendaProfissional
                  agendamentos={agenda}
                  profissionalSelecionado={profissionalSelecionado}
                />
              ) : (
                <div>
                  <p className="flex justify-center font-bold font-merriweather text-4xl text-[#E29C31] my-12">
                    Nenhum profissional selecionado.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditarAgendas;
