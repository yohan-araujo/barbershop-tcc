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
import ConfirmarServico from '../../pages/ConfirmarServico';
import Pagina404 from '../../pages/Pagina404';

export default function AppRouter() {
  const usuarioTipo = sessionStorage.getItem('usuarioTipo');
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');

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
            path="confirmarServico"
            element={usuarioTipo === 'P' ? <ConfirmarServico /> : <Pagina404 />}
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

          {/* Rotas do Gerais */}
          <Route path="cadastroUsuario" element={<CadastroUsuario />} />
          <Route path="agendamento" element={<Agendamento />} />
          <Route path="login" element={<Login />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="*" element={<Pagina404 />} />
        </Route>
      </Routes>
    </Router>
  );
}
