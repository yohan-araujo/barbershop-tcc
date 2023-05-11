import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { Outlet } from 'react-router-dom';

const PaginaPadrao = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <header>
        <div>Aqui vai todo o conteúdo que uma pagina tera como padrao</div>
      </header>
      <div>
        <Outlet />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default PaginaPadrao;
