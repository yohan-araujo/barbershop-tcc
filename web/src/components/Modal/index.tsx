import { ReactNode } from 'react';

interface ModalProps {
  exibirModal: boolean;
  children: ReactNode;
  titulo: string;
}

const Modal = ({ exibirModal, children, titulo }: ModalProps) => {
  if (!exibirModal) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal max-w-[56rem] w-full bg-black shadow-lg border-2 border-[#E29C31]">
        <div className="modal-header px-6 py-4  text-white">
          <h2 className="text-3xl font-bold font-merriweather text-[#E29C31] text-center">
            {titulo}
          </h2>
        </div>
        <div className="modal-body px-12 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
