import InputPadrao from 'components/InputPadrao';
import ButtonPadrao from 'components/ButtonPadrao';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [usu_email, setUsuEmail] = useState('');
  const [usu_senha, setUsuSenha] = useState('');
  const [usu_confirmaSenha, setUsuConfirmaSenha] = useState('');
  const [senhaInvalida, setSenhaInvalida] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(usu_email, usu_senha);
    // Verificacao para ver se as senhas coincidem, se nao ja retorna uma mensagem!
    if (usu_senha !== usu_confirmaSenha) {
      setSenhaInvalida(true);
      return;
    }

    axios
      .post('http://localhost:3001/api/loginUsuario', { usu_email, usu_senha })
      .then((response) => {
        // Verificar a resposta do servidor e realizar as ações necessárias
        if (response.data.success) {
          // Login bem-sucedido
          const { usuarioId, usuarioTipo, usuarioNome, usuarioFoto } =
            response.data;
          console.log(response.data.message);
          sessionStorage.setItem('usuarioLogado', 'true');
          sessionStorage.setItem('usuarioId', usuarioId);
          sessionStorage.setItem('usuarioNome', usuarioNome);
          sessionStorage.setItem('usuarioTipo', usuarioTipo);
          sessionStorage.setItem('usuarioFoto', usuarioFoto);
          // Redirecionar
          navigate('/');
          window.location.reload();
        } else {
          // Login falhou
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        // Tratar erros na requisição
        console.error('Erro ao fazer login:', error);
      });
  };

  return (
    <section className="flex items-center min-h-screen bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-[#414141] rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src="https://source.unsplash.com/user/erondu/1600x900"
              alt="img"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form action="" onSubmit={handleSubmit}>
                <h1 className="mb-4 text-5xl font-bold text-center text-white font-face-montserrat">
                  Login
                </h1>

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
                <div>
                  <InputPadrao
                    labelTexto="Confirmar senha"
                    placeholder="Confirme sua senha..."
                    tipo="password"
                    nome="usuSenhaConfirma"
                    onChange={(e) => {
                      setUsuConfirmaSenha(e.target.value);
                    }}
                  />
                </div>

                {senhaInvalida && (
                  <p className="flex justify-center font-face-montserrat text-red-500 ">
                    As senhas não coincidem.
                  </p>
                )}
                <div className="flex justify-center mt-12">
                  <ButtonPadrao texto="Entrar" tipo="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
