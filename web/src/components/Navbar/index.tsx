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
    <nav className="flex items-center py-2 px-4 bg-gray-700">
      <ul className="flex items-center">
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
    </nav>
  );
};

export default Navbar;
