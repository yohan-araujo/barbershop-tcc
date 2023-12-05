interface PropsButton {
  texto: string;
  onClick?: () => void;
  tipo?: "submit";
  outline?: boolean;
  tamanho?: string;
  disabled?: boolean;
}

const ButtonPadrao = ({
  texto,
  onClick,
  tipo,
  tamanho,
  outline,
  disabled,
}: PropsButton) => {
  return (
    <button
      className={`font-medium text-xl py-2 px-12 font-face-montserrat uppercase transition duration-200 ease-in-out ${
        outline
          ? "border border-[#E29C31] text-white hover:bg-[#E29C31] bg-transparent hover:text-[#000000]"
          : "border border-[#E29C31] text-black bg-[#E29C31] hover:bg-transparent hover:text-white"
      } 
      ${tamanho || ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      type={tipo}
      disabled={disabled}
    >
      {texto}
    </button>
  );
};

export default ButtonPadrao;
