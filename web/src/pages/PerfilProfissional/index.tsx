import ButtonPadrao from "components/ButtonPadrao";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import Skills from "./Skills";
import { useState, useEffect } from "react";
import { ISkill } from "types/ISkill";
import axios from "axios";
import GraficoPieProfissional from "components/GraficoPieProfissional";
import CarrosselGraficoProfissional from "components/CarroselGraficoProfissional";
import GraficoLineProfissional from "components/GraficoLineProfissional";

const PerfilProfissional = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const fotoUsuario = sessionStorage.getItem("usuarioFoto") ?? "";
  const nomeUsuario = sessionStorage.getItem("usuarioNome") ?? "";
  const proDesc = sessionStorage.getItem("proDesc") ?? "";
  const proCor = sessionStorage.getItem("proCor") ?? "";

  const containerStyle = {
    backgroundColor: proCor,
  };

  const charts = [<GraficoLineProfissional />, <GraficoPieProfissional />];

  const proId = sessionStorage.getItem("proId");

  useEffect(() => {
    axios
      .get<ISkill[]>(`http://localhost:3001/api/getSkills/${proId}`)
      .then((response) => {
        setSkills(response.data);
      });
  }, [proId]);

  return (
    <section className="flex bg-age">
      <div
        className="flex flex-col m-auto w-3/4 my-12 rounded-3xl"
        style={containerStyle}
      >
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
            {" "}
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
            <div className="flex flex-col mt-12">
              <div className="flex justify-start ml-12">
                <Skills skills={skills}></Skills>
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
              <div className="w-[28rem] mt-4 bg-[#677381]">
                <p className="text-white font-face-montserrat text-xl font-medium shadow-inner rounded-lg p-6">
                  {proDesc}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col justify-center">
              <div className="flex m-auto my-32">
                {" "}
                <Link to="/agendaProfissional" className="mt-6 ml-1">
                  <ButtonPadrao texto="minha agenda" />
                </Link>
                <Link to="/cadastroGaleria" className="mt-6 ml-1">
                  <ButtonPadrao texto="Adicionar foto na galeria" />
                </Link>
              </div>
            </div>
            <div className="mt-20">
              <span className="text-white text-4xl font-semibold font-face-montserrat">
                Desempenho
              </span>
              <div className="flex justify-center p-5 my-8">
                <CarrosselGraficoProfissional charts={charts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilProfissional;
