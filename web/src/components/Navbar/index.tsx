import { Link } from 'react-router-dom';

const Navbar = () => {
  const rotas = [
    {
      label: 'Home',
      to: '/',
    },
    {
      label: 'Cadastro',
      to: '/cadastroUsuario',
    },
    {
      label: 'Cadastro 2',
      to: '/cadastroProfissional',
    },
    {
      label: 'Agendamento',
      to: '/agendamento',
    },
    {
      label: 'Login',
      to: '/login',
    },
  ];

  return (
    <nav className="flex items-center justify-between py-2 px-4 bg-[#414141]">
      <ul className="flex items-center justify-start text-white">
        <li>icone</li>
        <li>
          <p className="font-normal">Barbershop</p>
        </li>
      </ul>
      <ul className="flex items-center justify-center flex-grow">
        {rotas.map((rota, index) => (
          <li key={index} className="list-none mr-6">
            <Link
              to={rota.to}
              className="text-white text-lg font-bold no-underline hover:text-gray-800 transition duration-200 ease-in-out"
            >
              {rota.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex items-center justify-end">
        <li className="list-none">
          <button className="bg-[#0064B1] text-white font-bold py-2 px-4 rounded-full mr-2">
            Login
          </button>
        </li>
        <li className="list-none">
          <button className="bg-[#0064B1] text-white font-bold py-2 px-4 rounded-full">
            Cadastrar
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
