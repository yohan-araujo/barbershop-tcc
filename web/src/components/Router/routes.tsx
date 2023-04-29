import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import CadastroUsuario from '../../pages/CadastroUsuario';
import Agendamento from '../../pages/Agendamento';
import Navbar from '../Navbar';
import PaginaPadrao from '../PaginaPadrao';
import Login from 'pages/Login';
import CadastroProfissional from 'pages/CadastroProfissional';
// import Footer from 'components/Footer';

export default function AppRouter() {
  return (
    <main>
      <main>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<PaginaPadrao />}>
              <Route index element={<Home />} />
              <Route path="cadastroUsuario" element={<CadastroUsuario />} />
              <Route
                path="cadastroProfissional"
                element={<CadastroProfissional />}
              />
              <Route path="agendamento" element={<Agendamento />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
        {/* <Footer /> */}
      </main>
    </main>
  );
}
