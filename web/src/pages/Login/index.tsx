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
          console.log(response.data.message);
          sessionStorage.setItem('usuarioLogado', 'true');
          // Redirecionar
          navigate('/');
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
    <section>
      <form
        className="flex flex-col items-center my-20"
        onSubmit={handleSubmit}
      >
        <div className="text-center rounded-md bg-[#414141] p-14">
          <h1 className="text-white text-4xl font-face-montserrat uppercase font-medium">
            Login
          </h1>
          <div className="my-5">
            <InputPadrao
              labelTexto="Email"
              placeholder="Digite aqui o seu email..."
              tipo="email"
              nome="usu_email"
              onChange={(e) => {
                setUsuEmail(e.target.value);
              }}
            />

            <InputPadrao
              labelTexto="Senha"
              placeholder="Digite aqui a sua senha..."
              tipo="password"
              nome="usu_senha"
              onChange={(e) => {
                setUsuSenha(e.target.value);
              }}
            />

            <InputPadrao
              labelTexto="Confirmar senha"
              placeholder="Confirme sua senha..."
              tipo="password"
              nome="usuSenhaConfirma"
              onChange={(e) => {
                setUsuConfirmaSenha(e.target.value);
              }}
            />

            {senhaInvalida && (
              <p className="text-red-500">As senhas não coincidem.</p>
            )}
          </div>
          <ButtonPadrao texto="Logar" tipo="submit" />
        </div>
      </form>
    </section>
  );
};

export default Login;
