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
    <section className="min-h-screen bg-black">
      <div className='flex flex-auto justify-center'>
        <div className='relative'>
          <div className="absolute w-[28.5rem] h-[42rem] border-2 left-[1.25rem] top-[9rem] border-[#E29C31]" />
          <div className="flex flex-auto my-32 relative z-10 bg-[#1D1D1D] rounded-lg shadow-xl">
            <div className="flex flex-col items-center">
              <div className="flex py-14 w-8/12">
                <div className="max-w-full">
                  <form action="" onSubmit={handleSubmit}>
                    <h1 className="text-[#E29C31] text-center text-5xl font-bold font-merriweather uppercase">
                      Redefinir senha
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
        </div>
      </div>
    </section>
  );
};

export default RedefinirSenha;
