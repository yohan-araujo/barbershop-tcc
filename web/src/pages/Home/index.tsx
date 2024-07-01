import axios from "axios";
import { useEffect, useState } from "react";
import { IProfissional } from "types/IProfissional";
import BgHome from "assets/bg-home.svg";
import imgbarbahora from "assets/img/bg-home2.jpg";
import { IServico } from "types/IServico";
import ListaCardsServicos from "./ListaCardsServicos";
import ListaCardsProfissional from "./ListaCardsProfissional";
import ButtonPadrao from "components/ButtonPadrao";
import ButtonZapZap from "components/ButtonZapzap";
import MapaLocal from "components/MapaLocal";

const Home = () => {
  const [listaProfissionais, setListaProfissionais] = useState<IProfissional[]>(
    []
  );
  const [listaServicos, setListaServicos] = useState<IServico[]>([]);

  useEffect(() => {
    axios
      .get<IProfissional[]>("http://localhost:3001/api/getProfissionais")
      .then((response) => {
        setListaProfissionais(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get<IServico[]>("http://localhost:3001/api/getServicosCadastrados")
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

              <div>
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
        <div className="grid grid-cols-2 gap-x-10 mx-5">
          <div className="flex flex-auto justify-end items-end">
            <div className="flex flex-col max-w-screen-md">
              <h2 className="text-orange-400 text-4xl font-bold font-face-montserrat text-left">
                Sobre nós
              </h2>
              <p className="text-justify font-normal font-face-montserrat text-xl text-white my-12 pr-48">
                Bem-vindo ao Barbershop, onde a tradição encontra o estilo
                moderno. Nossa barbearia oferece uma experiência completa para
                homens que valorizam um corte de cabelo impecável e um barbear
                preciso. Com uma equipe de barbeiros experientes e apaixonados
                pelo ofício, garantimos não apenas cortes clássicos e
                contemporâneos, mas também uma série de serviços adicionais.
                Aproveite nossas sessões de barba completa, que incluem
                modelagem, tratamento com produtos premium e até mesmo serviços
                de relaxamento como massagem facial. Além disso, oferecemos
                serviços de tintura de barba e cabelo, para aqueles que desejam
                um toque de cor ou cobertura de grisalhos. Na Barbearia
                Cortezia, cada cliente recebe atenção personalizada e sai não
                apenas com um visual renovado, mas também com a confiança de
                estar bem cuidado. Venha nos visitar e descubra como podemos
                transformar sua rotina de cuidados pessoais em um momento de
                prazer e estilo.
              </p>
            </div>
          </div>
          <div className="flex flex-auto ">
            <div className="flex flex-auto max-w-screen-md justify-start items-center">
              <MapaLocal />
            </div>
          </div>
        </div>
      </div>

      <section className="p-14 my-12">
        <div className="flex flex-col">
          <h2 className="text-orange-400 text-4xl font-bold font-face-montserrat text-center">
            Nossos Serviços
          </h2>
          <p className="font-normal font-face-montserrat text-xl m-12 px-36 text-white text-center">
            No Barbershop, oferecemos cortes de cabelo modernos, aparo de barba,
            tratamentos capilares e cuidados personalizados para garantir uma
            experiência de bem-estar e estilo impecável. Esses são os serviçõs
            disponíveis em nosso estabelecimento!
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
        <div className="flex flex-auto justify-center space-x-60 items-center ">
          <div className="flex justify-center">
            <div className="relative">
              <div className="border-2 absolute left-[1.25rem] top-[1.25rem] w-[35rem] h-[29rem] border-[#E29C31]"></div>
              <div className="flex flex-row">
                <img
                  className="w-[35rem] z-10 object-cover"
                  src={imgbarbahora}
                  alt="foto de um barbeiro"
                />
              </div>
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
            No Barbershop, nossa equipe de profissionais é o coração
            pulsante do nosso sucesso. Cada barbeiro traz consigo uma combinação
            única de talento, experiência e paixão pelo que faz, assegurando que
            cada cliente receba um serviço excepcional.
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

      <ButtonZapZap />
    </section>
  );
};

export default Home;
