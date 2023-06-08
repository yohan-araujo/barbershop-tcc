import axios from 'axios';
import Carrosel from 'components/Carrosel';
import { useEffect, useState } from 'react';
import { IProfissional } from 'types/IProfissional';
import ListaCardsHorizontais from './ListaCardsHorizontais';
import ButtonPadrao from 'components/ButtonPadrao';
import LegendaServicos from 'components/LegendaServicos';

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
    </section>
  );
};

export default Home;
