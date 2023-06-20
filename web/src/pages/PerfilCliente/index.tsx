import ButtonPadrao from 'components/ButtonPadrao';
import { Scissors, X } from 'lucide-react';
import ListaHorariosAtivos from './ListaHorariosAtivos';
import { useEffect, useState } from 'react';
import { IAgendamento } from 'types/IAgendamento';
import axios from 'axios';
import ListaHorariosInativos from './ListaHorariosInativos';

const PerfilCliente = () => {
  const [listaAgendamentosAtivos, setListaAgendamentosAtivos] = useState<
    IAgendamento[]
  >([]);
  const [listaAgendamentosInativos, setListaAgendamentosInativos] = useState<
    IAgendamento[]
  >([]);

  const fotoUsuario = sessionStorage.getItem('usuarioFoto') ?? '';
  const nomeUsuario = sessionStorage.getItem('usuarioNome') ?? '';

  useEffect(() => {
    axios
      .get<IAgendamento[]>(
        `http://localhost:3001/api/getAgendamentosAtivos/${sessionStorage.getItem(
          'clienteID'
        )}`
      )
      .then((response) => {
        setListaAgendamentosAtivos(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get<IAgendamento[]>(
        `http://localhost:3001/api/getAgendamentosInativos/${sessionStorage.getItem(
          'clienteID'
        )}`
      )
      .then((response) => {
        setListaAgendamentosInativos(response.data);
      });
  }, []);

  return (
    <div className="flex flex-col m-auto w-3/4 my-12 rounded-3xl bg-blue-900">
      <div className="flex flex-row ml-32">
        <img
          src={fotoUsuario}
          alt="foto do usuario"
          className="w-56 h-56 rounded-full relative top-[6em] shadow-2xl"
        />
        <span className="text-white text-4xl font-face-montserrat font-bold mt-40 ml-8">
          {nomeUsuario}
        </span>
        <div className="ml-auto mt-40 pr-8">
          <ButtonPadrao texto="Editar Perfil" />
        </div>
      </div>
      <div className="grid grid-cols-2 bg-[#6E7781] rounded-b-xl">
        <div className="flex flex-col my-36">
          {' '}
          <div className="flex flex-col ml-12">
            <span className="text-white text-4xl font-semibold font-face-montserrat">
              Horários ativos
            </span>
            <div className="flex mt-12 ml-32">
              <div className="flex mt-12">
                {listaAgendamentosAtivos.length > 0 ? (
                  <ListaHorariosAtivos agendamentos={listaAgendamentosAtivos} />
                ) : (
                  <div>
                    <p className="flex justify-center font-bold font-face-montserrat text-4xl text-white text-center">
                      Nenhum Agendamento registrado.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-12 mt-36">
            <div className="flex flex-col">
              <span className="text-white text-4xl font-semibold font-face-montserrat">
                Histórico
              </span>
              <div className="flex flex-col mt-12 ml-32">
                <div className="flex mt-12">
                  {listaAgendamentosInativos.length > 0 ? (
                    <ListaHorariosInativos
                      agendamentos={listaAgendamentosInativos}
                    />
                  ) : (
                    <div>
                      <p className="flex justify-center font-bold font-face-montserrat text-4xl text-white text-center">
                        Nenhum Agendamento registrado.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[28rem] mt-4"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center mt-36">
            <span className="text-white text-4xl font-semibold font-face-montserrat">
              Cartão fidelidade
            </span>
          </div>
          <div className="flex flex-col w-[18rem] mt-12 bg-[#677381] rounded-lg shadow-inner ml-52">
            <span className="font-face-montserrat text-white text-center mt-4 font-bold">
              Cortes ate a recompensa: 2
            </span>
            <div className="flex flex-row justify-center p-5 space-x-1">
              <div className="w-12 h-12 bg-slate-500 rounded-full shadow-inner">
                <div className="text-white mt-3 ml-3">
                  <Scissors />
                </div>
              </div>
              <div className="w-12 h-12 bg-slate-500 rounded-full shadow-inner">
                <div className="text-white mt-3 ml-3">
                  <Scissors />
                </div>
              </div>
              <div className="w-12 h-12 bg-slate-500 rounded-full shadow-inner">
                <div className="text-white mt-3 ml-3">
                  <Scissors />
                </div>
              </div>
              <div className="w-12 h-12 bg-slate-500 rounded-full shadow-inner">
                <div className="text-white mt-3 ml-3">
                  <X />
                </div>
              </div>
              <div className="w-12 h-12 bg-slate-500 rounded-full shadow-inner">
                <div className="text-white mt-3 ml-3">
                  <X />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilCliente;
