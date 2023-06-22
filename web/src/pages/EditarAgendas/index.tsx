import { useEffect, useState } from 'react';
import ProfissionaisSelect from './ProfissionaisSelect';
import { IProfissional } from 'types/IProfissional';
import axios from 'axios';
import { IAgendamento } from 'types/IAgendamento';
import AgendaProfissional from './AgendaProfissional';

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
    <section className="flex bg-age">
      <div className="flex flex-col m-auto w-3/4 my-12 rounded-3xl bg-blue-900">
        <div className="flex flex-col mt-5 bg-[#6E7781] rounded-b-xl ">
          <span className="text-center text-white text-6xl font-bold font-face-montserrat my-12">
            Editar Agendas
          </span>
          <div className="flex m-auto">
            <ProfissionaisSelect
              profissionais={profissionais}
              onProfissionalSelect={handleProfissionalSelecionado}
            />
          </div>

          <div className="flex-auto mt-16 p-5">
            {profissionalSelecionado ? (
              <AgendaProfissional
                agendamentos={agenda}
                profissionalSelecionado={profissionalSelecionado}
              />
            ) : (
              <div>
                <p className="flex justify-center font-bold font-face-montserrat text-4xl text-white my-12">
                  Nenhum profissional selecionado.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditarAgendas;
