import InputPadrao from 'components/InputPadrao';
import ButtonPadrao from 'components/ButtonPadrao';
import { useState } from 'react';
import axios from 'axios';
import MensagemFeedback from 'components/MensagemFeedback';

const RedefinirSenha = () => {
  const [usu_email, setUsuEmail] = useState('');
  const [usu_confirmarEmail, setConfirmarEmail] = useState('');
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
    subMessage: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usu_email !== usu_confirmarEmail) {
      setFeedback({
        type: 'failure',
        message: 'O envio falhou!',
        subMessage: 'Os emails não correspondem.',
      });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/redefinicaoDeSenha',
        {
          email: usu_email,
        }
      );
      // Lógica para lidar com a resposta da chamada à API
      console.log('Resposta da API:', response.data);
      setFeedback({
        type: 'success',
        message: 'Sucesso ao enviar o email!',
        subMessage: 'Cheque seu email para saber mais.',
      });
    } catch (error) {
      // Lidar com erros
      console.error('Erro ao enviar o email:', error);
      // Exibir mensagem de erro para o usuário
      setFeedback({
        type: 'failure',
        message: 'Ocorreu um erro ao enviar o email!',
        subMessage: 'Tente novamente mais tarde.',
      });
    }
  };

  return (
    <section className="flex items-center min-h-screen bg-black">
      <div className="absolute w-[55rem] h-[48rem] border-2 right-[28.5rem] top-[15rem] border-[#E29C31]" />
      <div className="flex my-32 h-full max-w-2xl mx-auto relative bg-[#1D1D1D] rounded-lg shadow-xl ">
        <div className="flex flex-col md:flex-row justify-center">
          <div className="flex my-6 justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form action="" onSubmit={handleSubmit}>
                <h1 className="text-[#E29C31] text-center text-5xl font-bold font-merriweather uppercase">
                  Redefinição de senha
                </h1>
                <p className="text-center mt-2 text-white text-base font-normal font-face-montserrat">
                  Insira o email já cadastrado para a redefinição de senha!
                </p>

                <div className="mt-12">
                  <InputPadrao
                    labelTexto="Email"
                    placeholder="Digite aqui o seu email..."
                    tipo="email"
                    nome="usu_email"
                    onChange={(e) => {
                      setUsuEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-12">
                  <InputPadrao
                    labelTexto="Confirmar Email"
                    placeholder="Confirme o seu email..."
                    tipo="email"
                    nome="ConfirmaUsu_email"
                    onChange={(e) => {
                      setConfirmarEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="flex justify-center mt-24">
                  <ButtonPadrao texto="Enviar" tipo="submit" />
                </div>
                {feedback.message && (
                  <MensagemFeedback
                    type={feedback.type as 'failure' | 'success'}
                    message={feedback.message}
                    subMessage={feedback.subMessage}
                    onClose={() =>
                      setFeedback({ type: '', message: '', subMessage: '' })
                    }
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedefinirSenha;
