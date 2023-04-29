import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const rotas = [
    {
      label: 'Home',
      to: '/',
    },
    {
      label: 'Cadastro',
      to: '/cadastroUsuario',
    },
    {
      label: 'Cadastro 2',
      to: '/cadastroProfissional',
    },
    {
      label: 'Agendamento',
      to: '/agendamento',
    },
    {
      label: 'Login',
      to: '/login',
    },
  ];

  return (
    <nav className={styles.menu}>
      <ul className={styles.menu__list}>
        {rotas.map((rota, index) => (
          <li key={index} className={styles.menu__link}>
            <Link to={rota.to}>{rota.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
