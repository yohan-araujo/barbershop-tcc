import { Link, useNavigate } from 'react-router-dom';
import { ICartaoFidelidade } from 'types/ICartaoFidelidade';
import CfFoto from 'assets/img/CfFoto.png';
import CFicon from 'assets/cf-icon.svg';
import ButtonPadrao from 'components/ButtonPadrao';

interface CartaoProps {
  cartoes: ICartaoFidelidade[];
}

const CartaoFidelidade = ({ cartoes }: CartaoProps) => {
  const MAX_BOLINHAS = 10;

  return (
    <div className="relative">
      <div
        className={`absolute top-3 left-8  ${
          MAX_BOLINHAS ? 'h-[14rem]' : 'h-[15rem]'
        } w-[40rem] border-2 border-[#E29C31]`}
      ></div>
      <div className="bg-black relative z-10 w-[41.5rem] py-4">
        <p className="text-white font-face-montserrat text-xl ml-12">
          Preencha para ganhar seu prêmio!
        </p>
        <div className="flex flex-row mt-4 ">
          {cartoes.map((cartao) => (
            <div key={cartao.cf_id} className="w-1/2 flex items-center mx-12">
              {cartao.cf_pontos < MAX_BOLINHAS ? (
                <div className="flex flex-wrap">
                  {Array.from({ length: MAX_BOLINHAS }).map((_, index) => (
                    <div
                      className={`w-12 h-12 rounded-full mb-4 mr-2 bg-[#E29C31] flex items-center justify-center ${
                        index < cartao.cf_pontos ? 'bg-[#E29C31]' : ''
                      }`}
                      key={index}
                    >
                      {index < cartao.cf_pontos && (
                        <img src={CFicon} alt="Ponto Cartão Fidelidade" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex ml-24">
                  <Link to="/agendamento">
                    <ButtonPadrao texto="Resgatar" />
                  </Link>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center w-1/2">
            <div className="relative">
              <div className="absolute top-1 left-2 h-[8rem] w-[8.5rem] border-2 border-[#E29C31]"></div>
              <img
                src={CfFoto}
                alt=""
                className="w-54 h-54 relative z-10 max-w-xs h-auto mb-4 object-cover "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartaoFidelidade;
