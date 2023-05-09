interface PropsButton {
  texto: string;
  onClick?: () => void;
}

const ButtonPadrao = ({ texto, onClick }: PropsButton) => {
  return (
    <button
      className="inline-block px-4 py-2 text-lg font-bold text-white bg-crimson rounded-md cursor-pointer hover:bg-darkred focus:outline-none focus:ring-4 focus:ring-brown disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default ButtonPadrao;
