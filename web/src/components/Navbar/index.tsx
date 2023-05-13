import { Link } from 'react-router-dom';
import barbershopLogo from 'assets/logo-barbershop.svg';

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
        <li className="list-none">
          <Link to="/login">
            <button className="bg-[#0064B1] text-white font-medium text-2xl py-2 px-4 rounded-full mr-2 font-face-montserrat">
              Login
            </button>
          </Link>
        </li>
        <li className="list-none">
          <Link to="/cadastroUsuario">
            <button className="bg-[#0064B1] text-white font-medium text-2xl py-2 px-4 rounded-full font-face-montserrat">
              Cadastrar
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
