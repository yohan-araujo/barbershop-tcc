interface PropsButton {
  texto: string;
  onClick?: () => void;
  tipo?: "submit";
  outline?: boolean;
}

const ButtonPadrao = ({ texto, onClick, tipo, outline }: PropsButton) => {
  return (
    <button
      className={` text-white font-medium text-xl py-2 px-12 font-face-montserrat ${
        outline
          ? "border border-[#E29C31] hover:bg-[#E29C31]"
          : "bg-[#E29C31] hover:bg-black border border-[#E29C31]"
      } `}
      onClick={onClick}
      type={tipo}
    >
      {texto}
    </button>
  );
};

export default ButtonPadrao;
