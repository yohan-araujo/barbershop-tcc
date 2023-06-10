import ButtonPadrao from 'components/ButtonPadrao';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';

const PerfilCliente = () => {
  const fotoUsuario = sessionStorage.getItem('usuarioFoto') ?? '';
  const nomeUsuario = sessionStorage.getItem('usuarioNome') ?? '';

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
              Skills
            </span>
            <div className="w-10 h-10 rounded-full bg-zinc-600 flex justify-center mt-1 ml-3 text-white">
              <Link to="#" className="mt-2 ml-1">
                <Edit />
              </Link>
            </div>
          </div>
          <div className="flex flex-col ml-12 mt-36">
            <div className="flex flex-row">
              <span className="text-white text-4xl font-semibold font-face-montserrat">
                Descrição
              </span>
              <div className="w-10 h-10 rounded-full bg-zinc-600 flex justify-center mt-1 ml-3 text-white">
                <Link to="#" className="mt-2 ml-1">
                  <Edit />
                </Link>
              </div>
            </div>
            <div className="w-[28rem] mt-4">
              <p className="text-white font-face-montserrat text-xl font-medium shadow-inner rounded-lg p-6">
                a
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col justify-center">
            <div className="flex m-auto mt-36">
              <ButtonPadrao texto="Editar Agenda" />
            </div>
            <div className="flex m-auto my-11">
              <ButtonPadrao texto="Editar Agenda" />
            </div>
          </div>
          <div className="">
            <span className="text-white text-4xl font-semibold font-face-montserrat">
              Desempenho mensal
            </span>
            <div className="flex justify-center p-5 my-8">
              <img
                src="https://source.unsplash.com/user/erondu/400x300"
                alt="imagem da onde fica o grafico"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilCliente;
