import ButtonPadrao from 'components/ButtonPadrao';
import ListaHorariosAtivos from './ListaHorarios';
import { useEffect, useState } from 'react';
import { IAgendamento } from 'types/IAgendamento';
import axios from 'axios';
import CartaoFidelidade from './CartaoFidelidade';
import { ICartaoFidelidade } from 'types/ICartaoFidelidade';

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
        `http://localhost:3001/api/getAgendamentosAtivosInativos/${sessionStorage.getItem(
          'clienteID'
        )}`
      )
      .then((response) => {
        setListaAgendamentosAtivos(response.data);
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
