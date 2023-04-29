import styles from './ButtonPadrao.module.scss';

interface PropsButton {
  texto: string;
  onClick?: () => void;
}

const ButtonPadrao = ({ texto, onClick }: PropsButton) => {
  return (
    <button className={styles.buttonPadrao} onClick={onClick}>
      {texto}
    </button>
  );
};

export default ButtonPadrao;
