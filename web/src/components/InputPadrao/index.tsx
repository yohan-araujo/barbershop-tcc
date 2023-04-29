import styles from './InputPadrao.module.scss';

interface InputProps {
  labelTexto: string;
  placeholder: string;
  tipo?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time';
  nome?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPadrao = ({
  placeholder,
  tipo = 'text',
  labelTexto,
  nome,
  value,
  onChange,
}: InputProps) => {
  return (
    <div className={styles.inputPadrao}>
      <label>{labelTexto}</label>
      <input
        type={tipo}
        placeholder={placeholder}
        name={nome}
        value={value}
        className={styles.inputPadrao__text}
        onChange={onChange}
      />
    </div>
  );
};

export default InputPadrao;
