import ButtonPadrao from "components/ButtonPadrao";
import { Link } from "react-router-dom";
import Skills from "./Skills";
import { useState, useEffect } from "react";
import { ISkill } from "types/ISkill";
import axios from "axios";
import CarrosselGraficoProfissional from "components/CarroselGraficoProfissional";
import PieChartFP from "components/PieChartFP";
import PieChartTS from "components/PieChartTS";
import DropdownFiltro from "pages/Dashboard/DropdownFiltro";

const PerfilProfissional = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [fotoUsuario, setFotoUsuario] = useState("") ?? "";
  const [dadosFp, setDadosFp] = useState([]);
  const [dadosTs, setDadosTs] = useState([]);
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("");

  const nomeUsuario = sessionStorage.getItem("usuarioNome") ?? "";
  const usuarioId = sessionStorage.getItem("usuarioId") ?? "";

  const charts = [
    <PieChartFP dados={dadosFp} />,
    <PieChartTS dados={dadosTs} />,
  ];

  const proId = sessionStorage.getItem("proId");

  useEffect(() => {
    axios
      .get<ISkill[]>(`http://localhost:3001/api/getSkills/${proId}`)
      .then((response) => {
        setSkills(response.data);
      });
  }, [proId]);

  useEffect(() => {
    if (usuarioId) {
      fetch(`http://localhost:3001/api/getImagensPerfis/${usuarioId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao obter a foto do perfil");
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

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/getDadosFP?filtro=${filtroSelecionado}&pro_id=${proId}`
      )
      .then((response) => {
        const formattedData = response.data.map((item: any) => ({
          name: item.age_pagamento,
          value: item.count,
        }));
        setDadosFp(formattedData);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }, [filtroSelecionado, proId]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/getDadosTS?filtro=${filtroSelecionado}&pro_id=${proId}`
      )
      .then((response) => {
        const formattedData = response.data.map((item: any) => ({
          name: item.ser_tipo,
          value: item.quantidade,
        }));
        setDadosTs(formattedData);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }, [filtroSelecionado, proId]);

  const handleFilterSelect = (selectedOption: string) => {
    setFiltroSelecionado(selectedOption);
    console.log("Opção selecionada:", selectedOption);
  };

  return (
    <section className="flex bg-black">
      <div className="flex flex-col m-auto w-3/4 bg-perfil ">
        <div className="flex flex-row ml-32 py-[4.5rem]">
          <div className="relative">
            <div className="absolute top-2 left-3 h-[15rem] w-[14.5rem] border-2 border-[#E29C31]"></div>
            <img
              src={fotoUsuario}
              alt="foto do usuario"
              className="relative w-56 h-56 z-10"
            />
          </div>
          <div className="ml-4 mt-4">
            <span className="text-white text-4xl font-merriweather font-bold mt-40 ml-8">
              {nomeUsuario}
            </span>
            <div className="flex flex-col mt-4">
              <span className="text-white ml-8 font-face-montserrat">
                Profissional do barbershop desde: x
              </span>
            </div>
          </div>

          <div className="flex ml-auto mt-48 pr-8">
            <ButtonPadrao texto="Editar Perfil" outline={true} />
          </div>
        </div>
        <div className="grid grid-cols-2 bg-[#1D1D1D] rounded-b-xl">
          <div className="flex flex-col my-36">
            {" "}
            <div className="flex flex-row ml-12">
              <span className="text-[#E29C31] text-4xl font-merriweather">
                Skills
              </span>
            </div>
            <div className="flex flex-col mt-12">
              <div className="flex justify-start ml-12">
                <Skills skills={skills}></Skills>
              </div>
            </div>
            <div className="flex flex-col ml-12 mt-36">
              <div className="flex flex-row">
                <div className="mt-16">
                  <span className="text-[#E29C31] text-4xl font-merriweather">
                    Desempenho
                  </span>
                  <div className="flex flex-col justify-center p-5 my-8">
                    <div className="">
                      <DropdownFiltro onSelectFilter={handleFilterSelect} />
                    </div>
                    <div className="mt-4">
                      <CarrosselGraficoProfissional charts={charts} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-36">
            <div>
              <span className="text-[#E29C31] text-4xl font-merriweather">
                Traços
              </span>
            </div>
            <div className="flex flex-col mt-12">
              <div className="flex justify-start ">
                <div className=" bg-[#E29C31] px-12 py-1 ml-2 shadow-inner">
                  <span className="text-white font-face-montserrat uppercase font-bold">
                    Rápido
                  </span>
                </div>
                <div className=" bg-[#E29C31] px-12 py-1 ml-2 shadow-inner">
                  <span className="text-white font-face-montserrat uppercase font-bold">
                    Desenhista
                  </span>
                </div>
                <div className=" bg-[#E29C31] px-12 py-1 ml-2 shadow-inner">
                  <span className="text-white font-face-montserrat uppercase font-bold">
                    Paciente
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-52">
              <span className="text-[#E29C31] text-4xl font-merriweather">
                Funções
              </span>{" "}
              <div className="flex flex-col ml-40 mt-12">
                <Link to="/agendaProfissional" className="mt-6 ml-1">
                  <ButtonPadrao
                    texto="minha agenda"
                    tamanho="w-[18rem]"
                    outline={true}
                  />
                </Link>
                <Link to="/cadastroGaleria" className="mt-6 ml-1">
                  <ButtonPadrao
                    texto="Cadastrar Foto"
                    tamanho="w-[18rem]"
                    outline={true}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilProfissional;
