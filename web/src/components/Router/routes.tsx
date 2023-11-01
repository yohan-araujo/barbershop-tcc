import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from '../../pages/Home';
import CadastroUsuario from '../../pages/CadastroUsuario';
import Agendamento from '../../pages/Agendamento';
import PaginaPadrao from '../PaginaPadrao';
import Login from '../../pages/Login';
import CadastroProfissional from '../../pages/CadastroProfissional';
import Sobre from '../../pages/Sobre';
import PerfilCliente from '../../pages/PerfilCliente';
import PerfilProfissional from '../../pages/PerfilProfissional';
import PerfilAdministrador from '../../pages/PerfilAdministrador';
import CadastroServico from '../../pages/CadastroServico';
import Pagina404 from '../../pages/Pagina404';
import EditarAgendas from 'pages/EditarAgendas';
import AgendaProfissional from '../../pages/AgendaProfissional';
import Galeria from 'pages/Galeria';

interface ProtegidoProps {
  component: React.ComponentType<any>;
}

function Protegido({ component: Component, ...props }: ProtegidoProps) {
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');

  if (!usuarioLogado) {
    return <Navigate to="/login" />; // Redirecionar para a página de login
  }

  return <Component {...props} />;
}

export default function AppRouter() {
  const usuarioTipo = sessionStorage.getItem('usuarioTipo');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPadrao />}>
          <Route index element={<Home />} />

          {/* Rotas do Cliente */}
          <Route
            path="perfilCliente"
            element={usuarioTipo === 'C' ? <PerfilCliente /> : <Pagina404 />}
          />

          {/* Rotas do Profissional */}
          <Route
            path="perfilProfissional"
            element={
              usuarioTipo === 'P' ? <PerfilProfissional /> : <Pagina404 />
            }
          />
          <Route
            path="agendaProfissional"
            element={
              usuarioTipo === 'P' ? <AgendaProfissional /> : <Pagina404 />
            }
          />

          {/* Rotas do Administrador */}
          <Route
            path="perfilAdministrador"
            element={
              usuarioTipo === 'A' ? <PerfilAdministrador /> : <Pagina404 />
            }
          />
          <Route
            path="cadastroProfissional"
            element={
              usuarioTipo === 'A' ? <CadastroProfissional /> : <Pagina404 />
            }
          />
          <Route
            path="cadastroServico"
            element={usuarioTipo === 'A' ? <CadastroServico /> : <Pagina404 />}
          />
          <Route
            path="editarAgendas"
            element={usuarioTipo === 'A' ? <EditarAgendas /> : <Pagina404 />}
          />

          {/* Rotas do Gerais */}
          <Route path="cadastroUsuario" element={<CadastroUsuario />} />
          <Route
            path="agendamento"
            element={<Protegido component={Agendamento} />}
          />
          <Route path="galeria" element={<Galeria />} />
          <Route path="login" element={<Login />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="*" element={<Pagina404 />} />
        </Route>
      </Routes>
    </Router>
  );
}
