import { Outlet } from 'react-router-dom';

const PaginaPadrao = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <header>
        <div>Aqui vai todo o conteúdo que uma pagina tera como padrao</div>
      </header>
      <div>
        <Outlet />
        {children}
      </div>
    </>
  );
};

export default PaginaPadrao;
