import { useNavigate } from 'react-router-dom';
import { ICartaoFidelidade } from 'types/ICartaoFidelidade';
import CfFoto from 'assets/img/CfFoto.jpg';
import CFicon from 'assets/cf-icon.svg';

interface CartaoProps {
  cartoes: ICartaoFidelidade[];
}

const CartaoFidelidade = ({ cartoes }: CartaoProps) => {
  const MAX_BOLINHAS = 10;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/agendamento');
  };

  return (
    <div className="grid mx-12 p-6">
      <div className="relative">
        <div className="absolute top-7 left-16 h-[14rem] w-[33rem] border-2 border-[#E29C31]"></div>
        <div className="bg-black relative z-10 p-7">
          <p className="text-white font-face-montserrat text-xl">
            Preencha para ganhar seu prêmio!
          </p>
          <div className="flex flex-row">
            {cartoes.map((cartao) => (
              <div key={cartao.cf_id} className="">
                {cartao.cf_pontos < MAX_BOLINHAS && (
                  <div className="flex flex-wrap">
                    {Array.from({ length: MAX_BOLINHAS }).map((_, index) => (
                      <div className="flex flex-wrap" key={index}>
                        <div
                          className={`w-12 h-12 rounded-full mb-4 mr-2 bg-[#E29C31] flex items-center justify-center ${
                            index < cartao.cf_pontos ? 'bg-[#E29C31]' : ''
                          }`}
                        >
                          {index < cartao.cf_pontos && (
                            <div className="">
                              {' '}
                              <img
                                src={CFicon}
                                className=""
                                alt="Ponto Cartão Fidelidade"
                              />{' '}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-6">
              <img src={CfFoto} alt="" />
            </div>
          </div>
          <div className="flex justify-center p-2">
            {cartoes[0].cf_pontos >= MAX_BOLINHAS && (
              <button
                className="bg-green-500 text-white px-8 py-4 rounded-md font-face-montserrat font-bold uppercase mt-12"
                onClick={handleClick}
              >
                Resgatar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartaoFidelidade;
