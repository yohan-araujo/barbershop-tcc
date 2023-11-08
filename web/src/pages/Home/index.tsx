import axios from 'axios';
import { useEffect, useState } from 'react';
import { IProfissional } from 'types/IProfissional';
import ListaCardsHorizontais from './ListaCardsHorizontais';
import barberhomeimg from 'assets/barberhome.svg';
import imgbarbahora from 'assets/img/Rectangle78.jpg';
import { IServico } from 'types/IServico';
import ListaCardsServicos from './ListaCardsServicos';

const Home = () => {
  const [listaProfissionais, setListaProfissionais] = useState<IProfissional[]>(
    []
  );
  const [listaServicos, setListaServicos] = useState<IServico[]>([]);

  useEffect(() => {
    axios
      .get<IProfissional[]>('http://localhost:3001/api/getProfissionais')
      .then((response) => {
        setListaProfissionais(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get<IServico[]>('http://localhost:3001/api/getServicosCadastrados')
      .then((response) => {
        setListaServicos(response.data);
      });
  }, []);

  return (
    <section className="bg-black">
      <div className="bg-black w-max-screen px-8">
        <div className="grid grid-cols-2 border-2 border-red-400">
          <div className="flex justify-start lg:ml-36 ml-12">
            <div className="flex flex-col p-12 justify-center gap-6 border-2 border-orange-400">
              <div className="text-white text-5xl font-bold font-merriweather">
                <span>CORTAMOS BEM</span>
                <br />
                <span>PARA CONTAR</span>
                <br />
                <span className="text-orange-400">SEMPRE!</span>
              </div>

              <div className="w-2/4 text-white text-base font-medium font-['Montserrat']">
                Venha cortar em uma das melhores barbearias da cidade!
              </div>

              <div className="w-48 h-10 border-2 border-orange-400 flex justify-center items-center">
                <span className="text-white font-semibold font-face-montserrat">
                  Agendar Horário
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end lg:mr-36 mr-12">
            <div className="max-w-lg border-2 border-blue-500">
              <img src={barberhomeimg} alt="Fotos da barbearia" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-stone-900 p-14">
        <div className="flex flex-row justify-between">
          <div className="w-1/2">
            <h2 className="text-orange-400 text-4xl font-bold font-face-montserrat text-left ml-14">
              Sobre nós
            </h2>
            <p className="text-justify font-medium font-face-montserrat text-xl m-12 text-white">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. <br /> Contrary to popular belief, Lorem Ipsum is not
              simply random text. It has roots in a piece of classical Latin
              literature from 45 BC, making it over 2000 years old. Richard
              McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
              1.10.33 of "de Finibus Bonorum et Malorum"
            </p>
          </div>

          <div className="flex flex-auto justify-center items-center">
            <img
              src="https://source.unsplash.com/user/erondu/445x367"
              alt="foto do mapa"
              className="m-2 md:w-[30rem] md:h-[30rem]"
            />
          </div>
        </div>
      </div>

      <section className=" p-14">
        <div className="flex flex-col">
          <h2 className="text-orange-400 text-4xl font-bold font-face-montserrat text-center ml-14">
            Nossos Servicos
          </h2>
          <p className="font-medium font-face-montserrat text-xl m-12 text-white text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {listaServicos.length > 0 ? (
          <ListaCardsServicos servicos={listaServicos} />
        ) : (
          <div>
            <p className="flex justify-center text-white font-bold font-face-montserrat text-4xl">
              Nenhum Servico registrado.
            </p>
          </div>
        )}
      </section>

      <div className="w-max-screen h-3/5 bg-stone-800">
        <div className="flex flex-row items-center lg:mx-[12rem] md:mx-5 gap-12 md:gap-4">
          <div className="flex flex-auto p-8">
            <div className="relative">
              <div className="lg:w-[35rem] md:w-[24rem] lg:h-[29rem] md:h-[20rem] absolute top-7 left-7 border-2 border-orange-400 border-solid border-opacity-50 bottom-0 right-0"></div>
              <img
                className="lg:w-[35rem] md:w-[25rem] relative z-10"
                src={imgbarbahora}
              />
            </div>
          </div>

          <div className="flex flex-col my-8 p-5 bg-black border border-orange-400 w-[30rem] h-[38rem]">
            <div className="ml-5 mt-3">
              <h3 className="w-[293px] h-[83px] mb-[7rem] text-orange-400 text-4xl font-bold font-['Merriweather']">
                Horário de funcionamento
              </h3>

              <div className="flex flex-col gap-16">
                <div className="flex flex-col items-center">
                  <div className="border-b border-orange-400 mt-4 w-full flex justify-between">
                    <div className="text-white text-base font-medium font-face-montserrat">
                      Segunda a sexta
                    </div>
                    <div className="text-white text-base font-medium font-face-montserrat">
                      09:00 às 21:00
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="border-b border-orange-400 mt-4 w-full flex justify-between">
                    <div className="text-white text-base font-medium font-face-montserrat">
                      Sábado
                    </div>
                    <div className="text-white text-base font-medium font-face-montserrat">
                      09:00 a 19:00
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="border-b border-orange-400 mt-4 w-full flex justify-between">
                    <div className="text-white text-base font-medium font-face-montserrat">
                      Domingo e Feriados
                    </div>
                    <div className="text-white text-base font-medium font-face-montserrat">
                      Fechados
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-28">
        <div className="text-center p-5">
          <h2 className="text-orange-400 text-4xl font-bold font-Merriweather my-5">
            Conheça nossos funcionários
          </h2>
          <p className="text-white text-base font-semibold font-face-montserrat mx-64">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {listaProfissionais.length > 0 ? (
          <ListaCardsHorizontais profissionais={listaProfissionais} />
        ) : (
          <div>
            <p className="flex justify-center text-white font-bold font-face-montserrat text-4xl">
              Nenhum profissional registrado.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
