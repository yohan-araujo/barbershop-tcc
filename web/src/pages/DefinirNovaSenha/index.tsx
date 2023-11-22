import InputPadrao from 'components/InputPadrao';
import ButtonPadrao from 'components/ButtonPadrao';
import { useState } from 'react';
import MensagemFeedback from 'components/MensagemFeedback';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const DefinirNovaSenha = () => {
  const [usu_senha, setUsuSenha] = useState('');
  const [usu_confirmarSenha, setConfirmarSenha] = useState('');
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
    subMessage: '',
  });

  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token');
  console.log(token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usu_senha !== usu_confirmarSenha) {
      setFeedback({
        type: 'failure',
        message: 'Os e-mails não correspondem!',
        subMessage: 'O envio falhou!',
      });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/definirNovaSenha',
        {
          token: token,
          novaSenha: usu_senha,
        }
      );
      // Lógica para lidar com a resposta da chamada à API
      console.log('Resposta da API:', response.data);
      setFeedback({
        type: 'success',
        message: 'Senha redefinida com sucesso!',
        subMessage: 'Tente acessar sua conta agora.',
      });
    } catch (error) {
      // Lidar com erros
      console.error('Erro ao redefinir a senha:', error);
      // Exibir mensagem de erro para o usuário
      setFeedback({
        type: 'failure',
        message: 'Erro!',
        subMessage: 'Ocorreu um erro ao redefinir a senha!',
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
                  Definição de nova senha
                </h1>
                <p className="text-center mt-2 text-white text-base font-normal font-face-montserrat">
                  Insira sua senha e a confirme!
                </p>

                <div className="mt-12">
                  <InputPadrao
                    labelTexto="Senha"
                    placeholder="Digite aqui a sua senha..."
                    tipo="password"
                    nome="usu_senha"
                    onChange={(e) => {
                      setUsuSenha(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-12">
                  <InputPadrao
                    labelTexto="Confirmar Senha"
                    placeholder="Confirme a sua senha..."
                    tipo="password"
                    nome="ConfirmaUsu_senha"
                    onChange={(e) => {
                      setConfirmarSenha(e.target.value);
                    }}
                  />
                </div>

                <div className="flex justify-center mt-24">
                  <ButtonPadrao texto="Redefinir senha" tipo="submit" />
                </div>
                {feedback.message && (
                  <MensagemFeedback
                    type={feedback.type as 'failure' | 'success'}
                    message={feedback.message}
                    subMessage={feedback.subMessage}
                    onClose={() =>
                      setFeedback({ type: '', message: '', subMessage: '' })
                    }
                    redirectTo="/login"
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

export default DefinirNovaSenha;
