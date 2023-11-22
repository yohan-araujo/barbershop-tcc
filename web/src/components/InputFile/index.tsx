interface InputFileProps {
  textoBotao: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputFile = ({ onChange, textoBotao }: InputFileProps) => {
  return (
    <label className="bg-[#E29C31] text-xl font-medium text-white py-2 cursor-pointer font-face-montserrat">
      {textoBotao}
      <input type="file" className="hidden" onChange={onChange} />
    </label>
  );
};

export default InputFile;
