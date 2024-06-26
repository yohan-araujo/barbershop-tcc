import { Link, useNavigate } from "react-router-dom";
import barbershopIcon from "assets/icon-barbershop.svg";
import ButtonPadrao from "components/ButtonPadrao";
import DropdownSelect from "components/DropdownSelect";
import {
  UserCircle,
  UserPlus,
  FilePlus,
  Edit,
  CalendarDays,
  Image,
} from "lucide-react";
import { IOption } from "types/IOptions";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [dropdownOptions, setDropdownOptions] = useState<IOption[]>([]);
  const [fotoUsuario, setFotoUsuario] = useState("");

  const rotas = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Sobre",
      to: "/sobre",
    },
    {
      label: "Agendamento",
      to: "/agendamento",
    },
    {
      label: "Galeria",
      to: "/galeria",
    },
  ];

  const usuarioLogado = sessionStorage.getItem("usuarioLogado") === "true";
  const usuarioTipo = sessionStorage.getItem("usuarioTipo");
  const usuarioNome = sessionStorage.getItem("usuarioNome");
  const usuarioId = sessionStorage.getItem("usuarioId");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpar dados de sessão ou estado relacionados ao login
    sessionStorage.removeItem("usuarioLogado");
    sessionStorage.removeItem("usuarioId");
    sessionStorage.removeItem("usuarioFoto");
    sessionStorage.removeItem("usuarioNome");
    sessionStorage.removeItem("usuarioTipo");

    // Redirecionar para a página de login ou qualquer outra página desejada após o logout
    navigate("/");
    window.location.reload();
  };

  const handleOptionChange = (option: IOption | null) => {
    if (option && option.to) {
      navigate(option.to);
    }
  };

  useEffect(() => {
    let options: IOption[] = [];

    if (usuarioTipo === "C") {
      options = [
        {
          value: "1",
          label: "Perfil",
          to: "/perfilCliente",
          icon: <UserCircle />,
        },
      ];
    } else if (usuarioTipo === "P") {
      options = [
        {
          value: "1",
          label: "Perfil",
          to: "/perfilProfissional",
          icon: <UserCircle />,
        },
        {
          value: "2",
          label: "Agenda",
          to: "/agendaProfissional",
          icon: <CalendarDays />,
        },
        {
          value: "3",
          label: "Cadastro de foto",
          to: "/cadastroGaleria",
          icon: <Image />,
        },
      ];
    } else if (usuarioTipo === "A") {
      options = [
        {
          value: "1",
          label: "Perfil",
          to: "/perfilAdministrador",
          icon: <UserCircle />,
        },
        {
          value: "2",
          label: "Cadastrar Profissional",
          to: "/cadastroProfissional",
          icon: <UserPlus />,
        },
        {
          value: "3",
          label: "Cadastrar Serviço",
          to: "/cadastroServico",
          icon: <FilePlus />,
        },
        {
          value: "4",
          label: "Editar Agendas",
          to: "/agendaAdministrador",
          icon: <Edit />,
        },
        {
          value: "5",
          label: "Cadastro de foto",
          to: "/cadastroGaleria",
          icon: <Image />,
        },
      ];
    }

    setDropdownOptions(options);
  }, [usuarioTipo]);

  useEffect(() => {
    if (usuarioId) {
      fetch(`http://localhost:3001/api/getImagensPerfis/${usuarioId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao obter a foto do perfil");
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

  return (
    <nav className="flex items-center justify-between py-2 px-4 bg-black border-b border-b-[#E29C31]">
      <div className="flex items-center justify-start text-white">
        <Link to="/">
          <img
            src={barbershopIcon}
            alt="logo do barbershop"
            className="w-14 h-14 ml-16 cursor-pointer"
          />
        </Link>
      </div>
      <ul className="flex items-center justify-center flex-grow">
        {rotas.map((rota, index) => (
          <li key={index} className="list-none mx-12 uppercase">
            <Link
              to={rota.to}
              className="text-white text-xl font-medium no-underline hover:text-[#E29C31] transition duration-200 ease-in-out font-face-montserrat"
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
            <p className="text-white text-2xl font-medium mr-4 font-face-montserrat">
              {usuarioNome}
            </p>
            <img
              src={fotoUsuario}
              alt="Foto do usuário"
              className="w-12 h-12 rounded-full mr-2"
            />

            <ButtonPadrao texto="Sair" onClick={handleLogout} />
          </li>
        ) : (
          <li className="list-none flex space-x-4 mr-12">
            <Link to="/login">
              <ButtonPadrao texto="Login" />
            </Link>
            <Link to="/cadastroCliente">
              <ButtonPadrao texto="Cadastro" outline={true} />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
