import axios from 'axios';
import { useEffect, useState } from 'react';
import { IProfissional } from 'types/IProfissional';
import BgHome from 'assets/bg-home.svg';
import imgbarbahora from 'assets/img/bg-home2.jpg';
import { IServico } from 'types/IServico';
import ListaCardsServicos from './ListaCardsServicos';
import ListaCardsProfissional from './ListaCardsProfissional';
import ButtonPadrao from 'components/ButtonPadrao';

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
      <div className="bg-black w-max-screen">
        <div className="grid grid-cols-2 space-x-12">
          <div className="flex justify-end lg:ml-36 ml-12">
            <div className="flex flex-col px-24 justify-center gap-12 ">
              <div className="text-white text-5xl font-bold">
                <span className="uppercase text-7xl font-merriweather">
                  CORTAMoS BEM
                </span>
                <br />
                <span className="uppercase text-7xl font-merriweather">
                  PARA CORTAR
                </span>
                <br />
                <span className="text-orange-400 text-7xl font-merriweather">
                  SEMPRE!
                </span>
              </div>

              <div className="w-3/4 text-white text-xl font-medium font-['Montserrat']">
                Venha cortar em uma das melhores barbearias da cidade!
              </div>

              <div className="">
                <ButtonPadrao texto="Agendar horário" outline={true} />
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="">
              <img
                src={BgHome}
                alt="Fotos da barbearia"
                className="w-[40rem]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1D1D1D] p-14">
        <div className="flex flex-row">
          <div className="w-1/2 ml-36">
            <h2 className="text-orange-400 text-4xl font-bold font-face-montserrat text-left">
              Sobre nós
            </h2>
            <p className="text-justify font-normal font-face-montserrat text-xl text-white my-12 pr-48">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>

          <div className="flex flex-auto justify-start items-center">
            <img
              src="https://source.unsplash.com/user/erondu/445x367"
              alt="foto do mapa"
              className="m-2 md:w-[30rem] md:h-[30rem]"
            />
          </div>
        </div>
      </div>

      <section className="p-14 my-12">
        <div className="flex flex-col">
          <h2 className="text-orange-400 text-4xl font-bold font-face-montserrat text-center">
            Nossos Servicos
          </h2>
          <p className="font-normal font-face-montserrat text-xl m-12 px-36 text-white text-center">
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

      <div className="w-max-screen h-3/5 bg-[#1D1D1D] py-24">
        <div className="flex flex-row items-center lg:mx-[12rem] md:mx-5 gap-12 md:gap-4">
          <div className="flex flex-auto p-8">
            <div className="relative">
              <div className="lg:w-[35rem] md:w-[24rem] lg:h-[29rem] md:h-[20rem] absolute top-7 left-7 border-2 border-orange-400 border-solid border-opacity-50"></div>
              <img
                className="lg:w-[35rem] md:w-[25rem] relative z-10"
                src={imgbarbahora}
                alt="foto de um barbeiro"
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
                    <p className="text-white text-xl font-medium font-face-montserrat">
                      Segunda a sexta
                    </p>
                    <p className="text-white text-xl font-medium font-face-montserrat">
                      09:00 às 21:00
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="border-b border-orange-400 mt-4 w-full flex justify-between">
                    <p className="text-white text-xl font-medium font-face-montserrat">
                      Sábado
                    </p>
                    <p className="text-white text-xl font-medium font-face-montserrat">
                      09:00 a 19:00
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="border-b border-orange-400 mt-4 w-full flex justify-between">
                    <p className="text-white text-xl font-medium font-face-montserrat">
                      Domingo e Feriados
                    </p>
                    <p className="text-white text-xl font-medium font-face-montserrat">
                      Fechados
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-28">
        <div className="text-center p-5">
          <h2 className="text-[#E29C31] text-4xl font-bold font-merriweather my-5">
            Conheça nossos funcionários
          </h2>
          <p className="text-white text-xl font-normal font-face-montserrat mx-64">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {listaProfissionais.length > 0 ? (
          <ListaCardsProfissional profissionais={listaProfissionais} />
        ) : (
          <div>
            <p className="flex justify-center text-[#E29C31] font-bold font-merriweather text-4xl mt-24">
              Nenhum profissional cadastrado
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
