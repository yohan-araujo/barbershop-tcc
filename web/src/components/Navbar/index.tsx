import { Link, useNavigate } from 'react-router-dom';
import barbershopLogo from 'assets/logo-barbershop.svg';
import ButtonPadrao from 'components/ButtonPadrao';

const Navbar = () => {
  const rotas = [
    {
      label: 'Home',
      to: '/',
    },
    {
      label: 'Cadastro 2',
      to: '/cadastroProfissional',
    },
    {
      label: 'Agendamento',
      to: '/agendamento',
    },
  ];

  const usuarioLogado = sessionStorage.getItem('usuarioLogado') === 'true';
  const usuarioFoto = sessionStorage.getItem('usuarioFoto');
  const usuarioNome = sessionStorage.getItem('usuarioNome');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpar dados de sessão ou estado relacionados ao login
    sessionStorage.removeItem('usuarioLogado');
    sessionStorage.removeItem('usuarioFoto');
    sessionStorage.removeItem('usuarioNome');

    // Redirecionar para a página de login ou qualquer outra página desejada após o logout
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between py-2 px-4 bg-[#414141]">
      <ul className="flex items-center justify-start text-white">
        <img src={barbershopLogo} alt="logo do barbershop" />
        <li className="ml-7">
          <p className="font-face-playlist font-normal text-4xl">Barbershop</p>
        </li>
      </ul>
      <ul className="flex items-center justify-center flex-grow">
        {rotas.map((rota, index) => (
          <li key={index} className="list-none mr-6">
            <Link
              to={rota.to}
              className="text-white text-2xl font-medium no-underline hover:text-gray-800 transition duration-200 ease-in-out font-face-montserrat"
            >
              {rota.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex items-center justify-end ">
        {usuarioLogado ? (
          <li className="list-none">
            <p className="text-white text-2xl font-medium mr-2">
              {usuarioNome}
            </p>
            <img
              src={usuarioFoto ?? ''}
              alt="Foto do usuário"
              className="w-8 h-8 rounded-full"
            />
            <ButtonPadrao texto="sair" onClick={handleLogout} />
          </li>
        ) : (
          <li className="list-none">
            <Link to="/login">
              <button className="bg-[#0064B1] text-white font-medium text-2xl py-2 px-4 rounded-full mr-2 font-face-montserrat">
                Login
              </button>
            </Link>
            <Link to="/cadastroUsuario">
              <button className="bg-[#0064B1] text-white font-medium text-2xl py-2 px-4 rounded-full font-face-montserrat">
                Cadastrar
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
