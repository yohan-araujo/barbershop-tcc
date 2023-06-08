import ButtonPadrao from 'components/ButtonPadrao';
import { Link } from 'react-router-dom';

const PerfilProfissional = () => {
  const fotoUsuario = sessionStorage.getItem('usuarioFoto');
  const nomeUsuario = sessionStorage.getItem('usuarioNome');

  return (
    <div className="container mx-auto px-4 bg-[#414141] rounded-xl">
      <div className="flex items-center w-full py-6 bg-black">
        <img
          className="rounded-full h-20 w-20 mr-4"
          src={fotoUsuario ?? ''}
          alt="Foto do Usuário"
        />
        <div className="text-white">
          <h1 className="text-2xl font-bold">{nomeUsuario}</h1>
          <ButtonPadrao texto="Editar perfil" />
        </div>
      </div>

      <div className="mb-6">
        <ButtonPadrao texto="Editar agenda" />
        <Link to="/confirmarServico">
          <ButtonPadrao texto="Confirmar Horario" />
        </Link>
      </div>

      <div>
        <p className="text-white">Descricao</p>
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere
          dolor ut mauris convallis rutrum. Vivamus pellentesque lectus a leo
          efficitur, vel pharetra enim pulvinar. Morbi quis ultrices mi, nec
          tempus lacus.
        </p>
      </div>
    </div>
  );
};

export default PerfilProfissional;
