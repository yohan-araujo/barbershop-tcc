import ButtonPadrao from 'components/ButtonPadrao';
import { Edit } from 'lucide-react';
import ListaHorariosAtivos from './ListaHorariosAtivos';
import { useEffect, useState } from 'react';
import { IAgendamento } from 'types/IAgendamento';
import axios from 'axios';
import ListaHorariosInativos from './ListaHorariosInativos';
import { Link } from 'react-router-dom';
import CartaoFidelidade from './CartaoFidelidade';
import { ICartaoFidelidade } from 'types/ICartaoFidelidade';

const PerfilCliente = () => {
  const [listaAgendamentosAtivos, setListaAgendamentosAtivos] = useState<
    IAgendamento[]
  >([]);
  const [listaAgendamentosInativos, setListaAgendamentosInativos] = useState<
    IAgendamento[]
  >([]);
  const [cartoes, setCartoes] = useState<ICartaoFidelidade[]>([]);
  const [fotoUsuario, setFotoUsuario] = useState('');

  const nomeUsuario = sessionStorage.getItem('usuarioNome') ?? '';
  const clienteID = sessionStorage.getItem('clienteID') ?? '';
  const usuarioId = sessionStorage.getItem('usuarioId') ?? '';

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

  useEffect(() => {
    axios
      .get<ICartaoFidelidade[]>(
        `http://localhost:3001/api/getPontosCartao/${clienteID}`
      )
      .then((response) => {
        setCartoes(response.data);
      });
  }, []);

  useEffect(() => {
    if (usuarioId) {
      fetch(`http://localhost:3001/api/getImagensPerfis/${usuarioId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao obter a foto do perfil');
          }
          return response.text();
        })
        .then((data) => {
          setFotoUsuario(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [usuarioId]);

  return (
    <section className="flex bg-black">
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
              <div className="flex flex-row">
                <span className="text-white text-4xl font-semibold font-face-montserrat">
                  Horários ativos
                </span>
                <div className="w-10 h-10 rounded-full bg-zinc-600 flex justify-center mt-1 ml-3 text-white">
                  <Link to="#" className="mt-2 ml-1">
                    <Edit />
                  </Link>
                </div>
              </div>
              <div className="flex mt-12 ml-">
                <div className="flex ">
                  {listaAgendamentosAtivos.length > 0 ? (
                    <ListaHorariosAtivos
                      agendamentos={listaAgendamentosAtivos}
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
            <div className="flex flex-col ml-12 mt-36">
              <div className="flex flex-col">
                <span className="text-white text-4xl font-semibold font-face-montserrat">
                  Histórico
                </span>
                <div className="flex flex-col mt-12 ml-4">
                  <div className="flex">
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
            <span className="">Cartão Fidelidade</span>
            <div className="flex justify-center mt-32">
              {cartoes.length > 0 ? (
                <CartaoFidelidade cartoes={cartoes} />
              ) : (
                <p>Carregando...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilCliente;
