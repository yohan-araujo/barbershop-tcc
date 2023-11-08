interface PropsButton {
  texto: string;
  onClick?: () => void;
  tipo?: 'submit';
  outline?: boolean;
}

const ButtonPadrao = ({ texto, onClick, tipo, outline }: PropsButton) => {
  return (
    <button
      className={` text-white font-medium text-[16px] py-2 px-4 font-face-montserrat ${
        outline ? 'border border-[#E29C31]' : 'bg-[#E29C31] border-none'
      } `}
      onClick={onClick}
      type={tipo}
    >
      {texto}
    </button>
  );
};

export default ButtonPadrao;
