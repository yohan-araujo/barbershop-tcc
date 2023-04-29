import styles from './Card.module.scss';
import { IProfissional } from 'types/IProfissional';

interface CardProps {
  profissional: IProfissional;
  onClick: (id: number) => void;
  aoSelecionado: boolean;
}

const Card = ({ profissional, onClick, aoSelecionado }: CardProps) => {
  const handleClick = () => {
    onClick(profissional.id);
  };

  return (
    <div
      className={`${styles.profissional} ${
        aoSelecionado ? styles.profissionalSelecionado : styles.profissional
      }`}
      onClick={handleClick}
    >
      <div
        className={`${styles.profissional__cabecalho} ${
          aoSelecionado
            ? styles.profissionalSelecionado__cabecalho
            : styles.profissional__cabecalho
        }`}
      >
        <img
          src={profissional.enderecoFoto}
          alt={profissional.nome}
          className={styles.profissional__img}
        />
      </div>
      <div className={styles.profissional__rodape}>
        <h4>{profissional.nome}</h4>
        <h5>{profissional.descricao}</h5>
      </div>
    </div>
  );
};

export default Card;
