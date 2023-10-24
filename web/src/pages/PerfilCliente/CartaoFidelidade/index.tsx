import { useNavigate } from 'react-router-dom';
import { ICartaoFidelidade } from 'types/ICartaoFidelidade';

interface CartaoProps {
  cartoes: ICartaoFidelidade[];
}

const CartaoFidelidade = ({ cartoes }: CartaoProps) => {
  const MAX_BOLINHAS = 7;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/agendamento');
  };

  return (
    <div className="bg-zinc-600 rounded-xl">
      <div
        className={`bg-zinc-400 rounded-t-xl p-1 ${
          cartoes[0].cf_pontos >= MAX_BOLINHAS ? 'pontos-maximos' : ''
        }`}
      >
        <div className="text-2xl font-bold mb-4 font-face-montserrat text-white text-center mt-4">
          Cartão Fidelidade
        </div>
      </div>
      <div className="flex justify-center p-8 mt-6">
        {cartoes[0].cf_pontos >= MAX_BOLINHAS && (
          <button
            className="bg-green-500 text-white px-8 py-4 rounded-md font-face-montserrat font-bold uppercase"
            onClick={handleClick}
          >
            Resgatar
          </button>
        )}
      </div>
      {cartoes.map((cartao) => (
        <div key={cartao.cf_id} className="text-white mb-4 p-6">
          {cartao.cf_pontos < MAX_BOLINHAS && (
            <div className="flex">
              {Array.from({ length: MAX_BOLINHAS }).map((_, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full mr-2  ${
                    index < cartao.cf_pontos ? 'cortecabelo-svg' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CartaoFidelidade;
