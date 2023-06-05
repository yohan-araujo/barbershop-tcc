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
import ConfirmarServico from 'pages/ConfirmarServico';
import Pagina404 from 'pages/Pagina404';

export default function AppRouter() {
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');
  const tipoUsuario = sessionStorage.getItem('tipoUsuario');

  // Função auxiliar para verificar se o tipo de usuário é igual ao esperado
  const verificaTipoUsuario = (tipoEsperado: string) => {
    return tipoUsuario === tipoEsperado;
  };

  return (
    <main>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<PaginaPadrao />}>
              <Route index element={<Home />} />

              {/* Rota para usuários autenticados */}
              {usuarioLogado && (
                <>
                  {/* Rota para usuários com tipo 'C' (Cliente) */}
                  {verificaTipoUsuario('C') && (
                    <>
                      <Route
                        path="cadastroUsuario"
                        element={<CadastroUsuario />}
                      />
                      <Route path="agendamento" element={<Agendamento />} />
                      <Route path="perfilCliente" element={<PerfilCliente />} />
                    </>
                  )}

                  {/* Rota para usuários com tipo 'A' (Administrador) */}
                  {verificaTipoUsuario('A') && (
                    <>
                      <Route
                        path="cadastroProfissional"
                        element={<CadastroProfissional />}
                      />
                      <Route
                        path="perfilAdministrador"
                        element={<PerfilAdministrador />}
                      />
                      <Route
                        path="cadastroServico"
                        element={<CadastroServico />}
                      />
                    </>
                  )}

                  {/* Rota para usuários com tipo 'P' (Profissional) */}
                  {verificaTipoUsuario('P') && (
                    <>
                      <Route
                        path="perfilProfissional"
                        element={<PerfilProfissional />}
                      />
                      <Route
                        path="perfilProfissional/confirmarServico"
                        element={<ConfirmarServico />}
                      />
                    </>
                  )}
                </>
              )}

              {/* Rota comum para todos os tipos de usuário */}
              <Route path="login" element={<Login />} />
              <Route path="sobre" element={<Sobre />} />

              {/* Rota para página 404 */}
              <Route path="*" element={<Pagina404 />} />
            </Route>
          </Routes>
        </Router>
        {/* <Footer /> */}
      </main>
    </main>
  );
}
