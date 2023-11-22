import InputPadrao from 'components/InputPadrao';
import ButtonPadrao from 'components/ButtonPadrao';
import { useState } from 'react';
import axios from 'axios';
import MensagemFeedback from 'components/MensagemFeedback';
import welcomeBarberCadas from 'assets/img/barbercadas.svg';
import { Link } from 'react-router-dom';

const Login = () => {
  const [usu_email, setUsuEmail] = useState('');
  const [usu_senha, setUsuSenha] = useState('');
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
    subMessage: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    axios
      .post('http://localhost:3001/api/loginUsuario', { usu_email, usu_senha })
      .then((response) => {
        setFeedback({
          type: 'success',
          message: 'Sucesso',
          subMessage: 'Login realizado com sucesso!',
        });
        // Verificar a resposta do servidor e realizar as ações necessárias
        if (response.data.success) {
          // Login bem-sucedido
          const {
            usuarioId,
            usuarioTipo,
            usuarioNome,
            usuarioFoto,
            clienteID,
            proId,
            proDesc,
          } = response.data;

          //Armazenando na session os valores que vem do back end
          sessionStorage.setItem('usuarioTipo', usuarioTipo);
          sessionStorage.setItem('usuarioLogado', 'true');
          sessionStorage.setItem('usuarioId', usuarioId);
          sessionStorage.setItem('usuarioNome', usuarioNome);
          sessionStorage.setItem('usuarioFoto', usuarioFoto);

          //Verificando o armazenamento pelo tipo de usuario
          if (sessionStorage.getItem('usuarioTipo') === 'C') {
            sessionStorage.setItem('clienteID', clienteID);
          } else if (sessionStorage.getItem('usuarioTipo') === 'P') {
            sessionStorage.setItem('proDesc', proDesc);
            sessionStorage.setItem('proId', proId);
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Credenciais inválidas
          setFeedback({
            type: 'failure',
            message: 'Falhou',
            subMessage: 'Email ou senha incorretos!',
          });
        } else {
          // Outro tipo de erro
          console.error('Erro na requisição:', error);
          setFeedback({
            type: 'failure',
            message: 'Falhou',
            subMessage: 'Ocorreu um erro na requisição.',
          });
        }
      });
  };

  return (
    <section className="flex items-center min-h-screen bg-black">
      <div className="absolute w-[55rem] h-[48rem] border-2 right-[28.5rem] top-[15rem] border-[#E29C31]" />
      <div className="flex-1 my-32 h-full max-w-4xl mx-auto relative bg-[#1D1D1D] rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover h-full min-w-full"
              src={welcomeBarberCadas}
              alt="img"
            />
          </div>
          <div className="flex my-6 justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form action="" onSubmit={handleSubmit}>
                <h1 className="text-[#E29C31] text-center text-5xl font-bold font-merriweather uppercase">
                  Bem-Vindo!
                </h1>
                <p className="w-auto text-center mt-2 text-white text-base font-normal font-['Montserrat']">
                  Insira suas informações e <br /> aproveite nossos serviços!
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
                <div className="mt-4">
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

                <div className="flex justify-center mt-24">
                  <ButtonPadrao texto="Entrar" tipo="submit" />
                </div>

                <Link to="/redefinirSenha">
                  <p className="text-white mt-8 text-center text-base font-normal font-face-montserrat underline">
                    Esqueceu a Senha?
                  </p>
                </Link>
                <div className="mt-6 border border-[#E29C31]"></div>

                <p className="flex justify-center mt-4 text-white text-sm font-normal font-face-montserrat">
                  Não possui conta?{' '}
                  <Link
                    to="cadastroCliente"
                    className="ml-1 text-[#E29C31] underline font-face-montserrat"
                  >
                    Cadastre-se!
                  </Link>
                </p>

                {feedback.message && (
                  <MensagemFeedback
                    type={feedback.type as 'failure' | 'success'}
                    message={feedback.message}
                    subMessage={feedback.subMessage}
                    onClose={() =>
                      setFeedback({ type: '', message: '', subMessage: '' })
                    }
                    redirectTo="/"
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

export default Login;
