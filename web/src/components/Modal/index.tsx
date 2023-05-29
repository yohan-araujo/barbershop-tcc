import { ReactNode } from 'react';

interface ModalProps {
  etapaAtual: number;
  aoFechar: () => void;
  children: ReactNode;
}

const Modal = ({ etapaAtual, aoFechar, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal max-w-md w-full bg-white rounded-lg shadow-lg">
        <div className="modal-header px-6 py-4 bg-gray-800 text-white">
          <h2 className="text-xl font-bold">Agendamento</h2>
          <button
            className="close-button text-gray-300 hover:text-white"
            onClick={aoFechar}
          >
            Fechar
          </button>
        </div>
        <div className="modal-body px-6 py-4">
          <div className="stepper flex mb-6">
            <div
              className={`step flex-1 text-center ${
                etapaAtual === 1 ? 'text-indigo-500' : 'text-gray-400'
              }`}
            >
              Seleção do Profissional
            </div>
            <div
              className={`step flex-1 text-center ${
                etapaAtual === 2 ? 'text-indigo-500' : 'text-gray-400'
              }`}
            >
              Seleção de Serviço
            </div>
            <div
              className={`step flex-1 text-center ${
                etapaAtual === 3 ? 'text-indigo-500' : 'text-gray-400'
              }`}
            >
              Seleção de Data e Hora
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
