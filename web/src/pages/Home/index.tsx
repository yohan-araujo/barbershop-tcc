import Carrosel from 'components/Carrosel';

const Home = () => {
  const imagens = [
    'https://picsum.photos/id/1003/1600/900',
    'https://picsum.photos/id/1004/1600/900',
    'https://picsum.photos/id/1005/1600/900',
    'https://picsum.photos/id/1006/1600/900',
  ];

  return (
    <section>
      <Carrosel imagens={imagens} />
    </section>
  );
};

export default Home;
