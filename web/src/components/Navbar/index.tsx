import { Link, useNavigate } from 'react-router-dom';
import barbershopLogo from 'assets/logo-barbershop.svg';
import ButtonPadrao from 'components/ButtonPadrao';
import DropdownSelect from 'components/Select';
import { UserCircle, UserPlus, FilePlus, CheckCircle } from 'lucide-react';
import { IOption } from 'types/IOptions';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [dropdownOptions, setDropdownOptions] = useState<IOption[]>([]);

  const rotas = [
    {
      label: 'Home',
      to: '/',
    },
    {
      label: 'Sobre',
      to: '/sobre',
    },
    {
      label: 'Agendamento',
      to: '/agendamento',
    },
  ];

  const usuarioLogado = sessionStorage.getItem('usuarioLogado') === 'true';
  const usuarioTipo = sessionStorage.getItem('usuarioTipo');
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

  const handleOptionChange = (option: IOption | null) => {
    if (option) {
      console.log('Opção selecionada:', option);
      navigate(option.to);
    }
  };

  useEffect(() => {
    let options: IOption[] = [];

    if (usuarioTipo === 'C') {
      options = [
        {
          value: '1',
          label: 'Perfil',
          to: '/perfilCliente',
          icon: <UserCircle />,
        },
      ];
    } else if (usuarioTipo === 'P') {
      options = [
        {
          value: '1',
          label: 'Perfil',
          to: '/perfilProfissional',
          icon: <UserCircle />,
        },
        {
          value: '2',
          label: 'Confirmar Servico',
          to: '/perfilProfissional/confirmarServico',
          icon: <CheckCircle />,
        },
      ];
    } else if (usuarioTipo === 'A') {
      options = [
        {
          value: '1',
          label: 'Perfil',
          to: '/perfilAdministrador',
          icon: <UserCircle />,
        },
        {
          value: '2',
          label: 'Cadastrar Profissional',
          to: '/cadastroProfissional',
          icon: <UserPlus />,
        },
        {
          value: '3',
          label: 'Cadastrar Serviço',
          to: '/cadastroServico',
          icon: <FilePlus />,
        },
      ];
    }

    setDropdownOptions(options);
  }, [usuarioTipo]);

  return (
    <nav className="flex items-center justify-between py-2 px-4 bg-[#414141]">
      <div className="flex items-center justify-start text-white">
        <img src={barbershopLogo} alt="logo do barbershop" />
        <p className="ml-7 font-face-playlist font-normal text-4xl">
          Barbershop
        </p>
      </div>
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
      <ul className="flex items-center justify-end">
        {usuarioLogado ? (
          <li className="list-none flex items-center">
            <DropdownSelect
              options={dropdownOptions}
              onChange={handleOptionChange}
            />
            <p className="text-white text-2xl font-medium mr-2 font-face-montserrat">
              {usuarioNome}
            </p>
            <img
              src={usuarioFoto ?? ''}
              alt="Foto do usuário"
              className="w-12 h-12 rounded-full mr-2"
            />

            <ButtonPadrao texto="Sair" onClick={handleLogout} />
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
