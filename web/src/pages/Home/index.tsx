import axios from 'axios';
import Carrosel from 'components/Carrosel';
import { useEffect, useState } from 'react';
import { IProfissional } from 'types/IProfissional';
import ListaCardsHorizontais from './ListaCardsHorizontais';
import ButtonPadrao from 'components/ButtonPadrao';
import LegendaServicos from 'components/LegendaServicos';
import { Search, User2 } from 'lucide-react';

const Home = () => {
  const [listaProfissionais, setListaProfissionais] = useState<IProfissional[]>(
    []
  );
  const imagens = [
    'https://picsum.photos/id/1003/1600/900',
    'https://picsum.photos/id/1004/1600/900',
    'https://picsum.photos/id/1005/1600/900',
    'https://picsum.photos/id/1006/1600/900',
  ];

  useEffect(() => {
    axios
      .get<IProfissional[]>('http://localhost:3001/api/getProfissionais')
      .then((response) => {
        setListaProfissionais(response.data);
      });
  }, []);

  return (
    <section>
      <Carrosel imagens={imagens} />

      <div className="flex flex-col my-24">
        <div className="ml-16 border-l-2">
          <h1 className="text-4xl font-bold ml-3 font-face-montserrat">
            Sobre
          </h1>
        </div>
        <div className="flex flex-row ">
          <div className="w-1/2">
            <p className="text-left font-face-montserrat text-2xl m-12">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              provident mollitia dolorum numquam assumenda? Suscipit magnam
              neque a officiis sint cumque fuga dolore laborum vitae! Fugiat
              dolorem doloremque earum nemo. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Enim provident mollitia dolorum
              numquam assumenda? Suscipit magnam neque a officiis sint cumque
              fuga dolore laborum vitae! Fugiat dolorem doloremque earum nemo.
            </p>
          </div>
          <div className="flex justify-center w-1/2 ">
            <img
              src="https://source.unsplash.com/user/erondu/400x300"
              alt="foto do mapa"
              className=""
            />
          </div>
        </div>
      </div>

      <div className="my-24">
        <LegendaServicos />
      </div>

      <div className="my-12">
        {listaProfissionais.length > 0 ? (
          <ListaCardsHorizontais profissionais={listaProfissionais} />
        ) : (
          <div>
            <p className="flex justify-center font-bold font-face-montserrat text-4xl">
              Nenhum profissional registrado.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center my-12">
        <ButtonPadrao texto="AGENDE SEU HORARIO" />
      </div>

      <div className="flex flex-col my-24">
        <div className="ml-16 border-l-2">
          <h1 className="text-4xl font-bold ml-3 font-face-montserrat">
            Cadastro
          </h1>
        </div>

        <div className="flex mx-auto my-24 bg-[#D9D9D9] rounded-2xl w-5/6">
          <form className="grid grid-cols-2 gap-8 p-24">
            <div>
              <div className="flex flex-col mb-8">
                <label className="font-face-montserrat text-2xl font-medium">
                  Nome Completo
                </label>
                <input
                  type="text"
                  className="font-face-montserrat text-2xl rounded-xl py-2 px-4 mt-2"
                />
              </div>
              <div className="flex flex-col mb-8">
                <label className="font-face-montserrat text-2xl font-medium">
                  E-mail
                </label>
                <input
                  type="text"
                  className="font-face-montserrat text-2xl rounded-xl py-2 px-4 mt-2"
                />
              </div>
              <div className="flex flex-col mb-8">
                <label className="font-face-montserrat text-2xl font-medium">
                  Senha
                </label>
                <input
                  type="password"
                  className="font-face-montserrat text-2xl rounded-xl py-2 px-4 mt-2"
                />
              </div>
              <div className="flex flex-col mb-8">
                <label className="font-face-montserrat text-2xl font-medium">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  className="font-face-montserrat text-2xl rounded-xl py-2 px-4 mt-2"
                />
              </div>
              <div className="flex flex-col mb-8">
                <label className="font-face-montserrat text-2xl font-medium">
                  Celular
                </label>
                <input
                  type="text"
                  className="font-face-montserrat text-2xl rounded-xl py-2 px-4 mt-2"
                />
              </div>
            </div>

            <div className="flex flex-col ml-80">
              <span className="font-face-montserrat text-2xl font-medium">
                Escolha uma foto
              </span>
              <div className="flex justify-center bg-white rounded-3xl p-12 my-2">
                <div>
                  <User2 size={128} />
                </div>
              </div>
              <div className="relative bottom-12 left-72">
                <div className="w-12 h-12 rounded-full bg-[#414141] justify-center">
                  <button className="mt-2 ml-2">
                    <Search size={30} className="text-white" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <label className="font-face-montserrat text-2xl font-medium">
                  Endereco da foto
                </label>
                <input
                  type="text"
                  className="font-face-montserrat text-2xl rounded-xl py-2 px-4 mt-2"
                />
              </div>
              <div className="relative left-64 mt-28">
                <button
                  type="submit"
                  className="font-face-montserrat text-2xl bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-6"
                >
                  CONFIRMAR
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Home;
