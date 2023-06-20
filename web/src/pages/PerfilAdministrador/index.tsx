import ButtonPadrao from 'components/ButtonPadrao';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';
import ListaProfissionais from './ListaProfissionais';
import { useEffect, useState } from 'react';
import { IProfissional } from 'types/IProfissional';
import axios from 'axios';

const PerfilAdministrador = () => {
  const [listaProfissionaisImagens, setListaProfissionaisImagens] = useState<
    IProfissional[]
  >([]);
  const fotoUsuario = sessionStorage.getItem('usuarioFoto') ?? '';
  const nomeUsuario = sessionStorage.getItem('usuarioNome') ?? '';

  useEffect(() => {
    axios
      .get<IProfissional[]>(`http://localhost:3001/api/getProfissionaisImagens`)
      .then((response) => {
        setListaProfissionaisImagens(response.data);
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
          <div className="flex flex-row ml-12">
            <span className="text-white text-4xl font-semibold font-face-montserrat">
              Profissionais
            </span>
          </div>
          <div className="flex ml-12 mt-12">
            <ListaProfissionais profissionais={listaProfissionaisImagens} />
          </div>
          <div className="flex flex-col ml-12 mt-36">
            <div className="flex flex-row">
              <span className="text-white text-4xl font-semibold font-face-montserrat">
                Desempenho profissionais
              </span>
            </div>
            <div className="w-[28rem] mt-4">
              <p className="text-white font-face-montserrat text-xl font-medium shadow-inner rounded-lg p-6">
                aqui vai o desempenho de cada profissional
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col justify-center">
            <div className="flex m-auto my-11">
              <ButtonPadrao texto="Editar Agenda" />
            </div>
            <div className="flex m-auto">
              <Link to="/cadastroServico" className="mt-2 ml-1">
                <ButtonPadrao texto="Cadastrar Servico" />
              </Link>
            </div>
          </div>
          <div className="mt-16">
            <span className="text-white text-4xl font-semibold font-face-montserrat">
              Desempenho mensal
            </span>
            <div className="flex justify-center p-5 my-8">
              <p className="text-white font-face-montserrat text-xl font-medium shadow-inner rounded-lg p-6">
                aqui vai o desempenho do estabelecimento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilAdministrador;
