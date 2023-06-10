import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  let backgroundColor = '';
  let textColor = '';
  let hoverColor = '';
  let icon = null;

  if (type === 'success') {
    backgroundColor = 'bg-green-600';
    textColor = 'text-green-600';
    hoverColor = 'hover:bg-green-700';
    icon = <CheckCircle size={108} />;
  } else if (type === 'failure') {
    backgroundColor = 'bg-red-500';
    textColor = 'text-red-500';
    hoverColor = 'hover:bg-red-700';
    icon = <AlertCircle size={108} />;
  }

  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-md shadow bg-white`}
        >
          <div className="flex flex-col items-center mb-2 ">
            {icon && <span className={`mr-2 ${textColor}`}>{icon}</span>}
            <span className="font-face-montserrat text-4xl font-bold mt-12 uppercase">
              {message}
            </span>
            <span className="font-face-montserrat text-2xl mt-2 text-gray-400 ">
              {subMessage}
            </span>
            <button
              className={`${backgroundColor} ${hoverColor} text-white text-2xl py-2 px-4 rounded font-face-montserrat mt-12 uppercase`}
              onClick={handleClose}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MensagemFeedback;
