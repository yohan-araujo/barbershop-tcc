interface PropsButton {
  texto: string;
  onClick?: () => void;
  tipo?: "submit";
  outline?: boolean;
  tamanho?: string;
}

const ButtonPadrao = ({
  texto,
  onClick,
  tipo,
  tamanho,
  outline,
}: PropsButton) => {
  return (
    <button
      className={`font-medium text-xl py-2 px-12 font-face-montserrat uppercase transition duration-200 ease-in-out ${
        outline
          ? "border border-[#E29C31] text-white hover:bg-[#E29C31] bg-transparent hover:text-[#000000]"
          : "border border-[#E29C31] text-black bg-[#E29C31] hover:bg-transparent hover:text-white"
      } 
      ${tamanho || ""}`}
      onClick={onClick}
      type={tipo}
    >
      {texto}
    </button>
  );
};

export default ButtonPadrao;
