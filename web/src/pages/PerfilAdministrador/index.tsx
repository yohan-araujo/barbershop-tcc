import ButtonPadrao from 'components/ButtonPadrao';
import { Link } from 'react-router-dom';
import ListaProfissionais from './ListaProfissionais';
import { useEffect, useState } from 'react';
import { IProfissional } from 'types/IProfissional';
import axios from 'axios';
import GraficoLine from '../../components/GraficoLine';
import CarroselGrafico from '../../components/CarroselGrafico';
import GraficoPie from 'components/GraficoPie';

const PerfilAdministrador = () => {
  const [listaProfissionais, setListaProfissionais] = useState<IProfissional[]>(
    []
  );
  const [fotoUsuario, setFotoUsuario] = useState('');
  const nomeUsuario = sessionStorage.getItem('usuarioNome') ?? '';
  const usuarioId = sessionStorage.getItem('usuarioId') ?? '';

  useEffect(() => {
    axios
      .get<IProfissional[]>(`http://localhost:3001/api/getProfissionais`)
      .then((response) => {
        setListaProfissionais(response.data);
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

  const charts = [<GraficoLine />, <GraficoPie />];

  return (
    <section className="min-h-screen bg-black">
      <div className="flex flex-col mx-auto w-3/4 bg-[#1D1D1D]">
        <div className='bg-admin relative z-0'>
          <div className="flex flex-auto items-start">
            <div className='relative z-10 m-12 px-4 py-12'>
              <div className='border-2 border-solid border-[#E29C31] absolute top-14 left-8 w-[14.5rem] h-[14.5rem]' />
              <img
                src={fotoUsuario}
                alt="foto do usuario"
                className="w-56 h-56 items-start relative z-10"
              />
            </div>
            <div className="flex flex-col ml-4 z-20 my-24">
              <h3 className="text-white text-5xl font-merriweather font-bold mb-8">
                {nomeUsuario}
              </h3>
              <h6 className='text-white text-base font-medium font-face-montserrat mb-2'>
                Trabalha no Barbershop desde 16 de Outubro de 2015
              </h6>
              <h6 className='text-white text-base font-medium font-face-montserrat'>
                Telefone: (12) 99415-8596
              </h6>
            </div>

            <div className="flex flex-auto justify-end mt-auto mb-4 mx-6">
              <ButtonPadrao texto="Editar Perfil" />
            </div>

          </div>

        </div>
        <div className="grid grid-cols-12 gap-4 mx-20">
          <div className="col-span-6 flex justify-start">
            <div className='flex flex-col my-20 mx-12'>
              <div className='flex flex-col gap-4 items-center'>
                <div className="flex flex-row">
                  <span className="text-[#E29C31] text-4xl font-bold font-merriweather">
                    Profissionais
                  </span>
                </div>
                <div className="flex flex-auto">
                  <ListaProfissionais profissionais={listaProfissionais} />
                </div>
                <div className="flex">
                  <Link to="/CadastroProfissional">
                    <ButtonPadrao texto="Cadastrar" tamanho='w-30' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6 flex justify-end mr-12 mt-16">
            <div className="flex flex-col gap-6">
              <div className='flex flex-col'>
                <div className='flex flex-auto pr-24 mb-6'>
                  <h3 className='items-start text-[#E29C31] text-4xl font-bold font-merriweather'>
                    Funções
                  </h3>
                </div>
                <div className="flex items-center">
                  <Link to="/editarAgendas">
                    <ButtonPadrao texto="Editar Agendas" tamanho='w-[18rem]' />
                  </Link>
                </div>
                <div className="flex items-center mt-4">
                  <Link to="/cadastroServico">
                    <ButtonPadrao texto="Cadastrar Servicos" tamanho='w-[18rem]'/>
                  </Link>
                </div>
                <div className="flex items-center mt-4">
                  <Link to="/cadastroGaleria">
                    <ButtonPadrao texto="Cadastrar Fotos" tamanho='w-[18rem]' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-4 mx-20'>
          <div className='col-span-6 my-12'>
            <div className="flex flex-col">
              <div className='flex items-start ml-8 '>
                <span className="text-orange-400 text-4xl font-bold font-merriweather">
                  Desempenho
                </span>
              </div>
              <div className="flex p-5 my-8">
                <CarroselGrafico charts={charts} />
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* <div className="flex flex-col">
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
                  </div> */}
    </section>
  );
};

export default PerfilAdministrador;
