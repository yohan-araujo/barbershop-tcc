interface PropsButton {
  texto: string;
  onClick?: () => void;
  tipo?: 'submit';
}

const ButtonPadrao = ({ texto, onClick, tipo }: PropsButton) => {
  return (
    <button
      className="bg-[#0064B1] text-white font-medium text-2xl py-2 px-4 rounded-full font-face-montserrat hover:bg-blue-300 border border-[#0064B1] focus:border-blue-950"
      onClick={onClick}
      type={tipo}
    >
      {texto}
    </button>
  );
};

export default ButtonPadrao;
