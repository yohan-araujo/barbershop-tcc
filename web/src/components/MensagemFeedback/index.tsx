import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonPadrao from 'components/ButtonPadrao';
import IconSuccess from 'assets/icon-success.svg';
import IconFailure from 'assets/icon-failure.svg';

type MensagemFeedbackProps = {
  message: string;
  subMessage: string;
  type: 'success' | 'failure';
  onClose: () => void;
  redirectTo?: string;
};

const MensagemFeedback = ({
  message,
  type,
  subMessage,
  onClose,
  redirectTo,
}: MensagemFeedbackProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsVisible(false);
    onClose();
    if (type === 'success' && redirectTo) {
      navigate(redirectTo);
      window.location.reload();
    }
  };

  const icon = type === 'success' ? IconSuccess : IconFailure;

  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-md shadow bg-[#1D1D1D]`}
        >
          <div className="flex flex-col items-center mb-2 ">
            <img src={icon} alt="" />
            <span className="font-face-montserrat text-4xl font-bold mt-12 text-white">
              {message}
            </span>
            <span className="font-face-montserrat text-2xl mt-2 text-[#E29C31] ">
              {subMessage}
            </span>
            <div className="mt-12">
              <ButtonPadrao
                texto="Continuar"
                outline={true}
                onClick={handleClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MensagemFeedback;
