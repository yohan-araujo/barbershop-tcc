import ButtonPadrao from 'components/ButtonPadrao';
import ListaHorariosAtivos from './ListaHorarios';
import { useEffect, useState } from 'react';
import { IAgendamento } from 'types/IAgendamento';
import axios from 'axios';
import CartaoFidelidade from './CartaoFidelidade';
import { ICartaoFidelidade } from 'types/ICartaoFidelidade';
import { Link } from 'react-router-dom';

const PerfilCliente = () => {
  const [listaAgendamentosAtivos, setListaAgendamentosAtivos] = useState<
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
        `http://localhost:3001/api/getAgendamentosAtivosInativos/${clienteID}`
      )
      .then((response) => {
        setListaAgendamentosAtivos(response.data);
      });
  }, [clienteID]);

  useEffect(() => {
    axios
      .get<ICartaoFidelidade[]>(
        `http://localhost:3001/api/getPontosCartao/${clienteID}`
      )
      .then((response) => {
        setCartoes(response.data);
      });
  }, [clienteID]);

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
      <div className="flex flex-col m-auto w-3/4 bg-perfil">
        <div className="flex flex-row ml-24 my-16">
          <div className="relative">
            <div className="absolute top-2 left-3 h-[15rem] w-[14.5rem] border-2 border-[#E29C31]"></div>
            <img
              src={fotoUsuario}
              alt="foto do usuario"
              className="relative z-10 w-56 h-56 shadow-inner"
            />
          </div>
          <div className="flex flex-col ml-6 mt-4">
            <span className="text-white text-4xl font-merriweather font-bold  ml-8">
              {nomeUsuario}
            </span>
            <span className="text-white text-lg font-face-montserrat ml-8 mt-6">
              Cliente desde: x
            </span>
            <span className="text-white text-text-lg font-face-montserrat ml-8">
              Telefone: x
            </span>
          </div>
          <div className="ml-auto mt-48 mr-8">
            <ButtonPadrao texto="Editar Perfil" outline={true} />
          </div>
        </div>
        <div className="grid grid-cols-2 bg-[#1D1D1D] ">
          <div className="flex flex-col my-32">
            {' '}
            <div className="flex flex-col ml-12">
              <div className="flex flex-row">
                <span className="text-[#E29C31] text-4xl font-semibold font-merriweather">
                  Horários ativos
                </span>
              </div>
              <div className="flex mt-12 ml-">
                <div className="flex flex-col ">
                  <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 bg-[#E29C31]"></div>
                    <h1 className="text-white font-face-montserrat">
                      Horarios ativos
                    </h1>
                    <div className="w-4 h-4 bg-black"></div>
                    <h1 className="text-white font-face-montserrat">
                      Horarios inativos
                    </h1>
                  </div>
                  <div className="mt-2">
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
            </div>
            <div className="flex flex-col ml-12 mt-36">
              <div className="flex flex-col">
                <span className="text-[#E29C31] text-4xl font-semibold font-merriweather">
                  Cartão fidelidade
                </span>
                <div className="flex justify-center mt-6">
                  {cartoes.length > 0 ? (
                    <CartaoFidelidade cartoes={cartoes} />
                  ) : (
                    <p>Carregando...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-6">
            <div className="flex flex-col my-32">
              <div className="flex justify-center mt-48">
                <Link to="/agendamento">
                  <ButtonPadrao texto="Agendar Horário" outline={true} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilCliente;
