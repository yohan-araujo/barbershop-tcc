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
import Login from 'pages/Login';
import CadastroProfissional from 'pages/CadastroProfissional';
import Sobre from 'pages/Sobre';
import PerfilCliente from 'pages/PerfilCliente';
import PerfilProfissional from 'pages/PerfilProfissional';
import PerfilAdministrador from 'pages/PerfilAdministrador';
import CadastroServico from 'pages/CadastroServico';
// import Footer from 'components/Footer';

export default function AppRouter() {
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');
  return (
    <main>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<PaginaPadrao />}>
              <Route index element={<Home />} />
              <Route path="cadastroUsuario" element={<CadastroUsuario />} />
              <Route
                path="cadastroProfissional"
                element={<CadastroProfissional />}
              />
              <Route path="cadastroServico" element={<CadastroServico />} />
              <Route path="agendamento" element={<Agendamento />} />
              <Route path="login" element={<Login />} />
              <Route path="sobre" element={<Sobre />} />
              <Route path="perfilCliente" element={<PerfilCliente />} />
              <Route
                path="perfilProfissional"
                element={<PerfilProfissional />}
              />
              <Route
                path="perfilAdministrador"
                element={<PerfilAdministrador />}
              />
            </Route>
          </Routes>
        </Router>
        {/* <Footer /> */}
      </main>
    </main>
  );
}
