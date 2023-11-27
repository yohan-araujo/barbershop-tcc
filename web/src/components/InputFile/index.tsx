interface InputFileProps {
  textoBotao: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  multiple?: boolean;
}

const InputFile = ({ onChange, textoBotao, multiple }: InputFileProps) => {
  return (
    <label className="bg-[#E29C31] text-xl font-medium text-white py-2 px-4 cursor-pointer font-face-montserrat">
      {textoBotao}
      <input
        type="file"
        className="hidden"
        onChange={onChange}
        multiple={multiple}
      />
    </label>
  );
};

export default InputFile;
