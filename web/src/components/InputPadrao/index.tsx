interface InputProps {
  labelTexto?: string;
  placeholder?: string;
  tipo?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'file';
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
    <div className="flex flex-col mb-4 text-center">
      <label className="mb-2 font-face-montserrat text-white text-xl ">
        {labelTexto}
      </label>
      <input
        type={tipo}
        placeholder={placeholder}
        name={nome}
        value={value}
        className="py-2 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-crimson focus:border-crimson font-face-montserrat"
        onChange={onChange}
      />
    </div>
  );
};

export default InputPadrao;
