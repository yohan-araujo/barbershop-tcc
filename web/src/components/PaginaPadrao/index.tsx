import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { Outlet } from 'react-router-dom';

const PaginaPadrao = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Navbar />

      <div>
        <Outlet />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default PaginaPadrao;
