import ButtonPadrao from 'components/ButtonPadrao';
import InputPadrao from 'components/InputPadrao';
import { useState } from 'react';
import axios from 'axios';
import MensagemFeedback from 'components/MensagemFeedback';
import welcomeBarberCadas from 'assets/img/barbercadas.svg';
import InputFile from 'components/InputFile';

const CadastroCliente = () => {
  const [usu_nomeCompleto, setUsuNome] = useState('');
  const [usu_email, setUsuEmail] = useState('');
  const [usu_foto, setUsuFoto] = useState<File | null>(null);
  const [usu_senha, setUsuSenha] = useState('');
  const [usu_confirmaSenha, setUsuConfirmarSenha] = useState('');
  const [cli_tel, setCliTel] = useState('');
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
    subMessage: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (usu_senha !== usu_confirmaSenha) {
      setFeedback({
        type: 'failure',
        message: 'As senhas não correspondem!',
        subMessage: 'O cadastro falhou!',
      });
      return;
    }

    const formData = new FormData();
    formData.append('usu_nomeCompleto', usu_nomeCompleto);
    formData.append('usu_email', usu_email);
    formData.append('usu_senha', usu_senha);
    if (usu_foto) formData.append('usu_foto', usu_foto);
    formData.append('cli_tel', cli_tel);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/insertUsuarioCliente',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setFeedback({
        type: 'success',
        message: 'Sucesso',
        subMessage: 'Cadastro realizado com sucesso!',
      });
    } catch (error) {
      setFeedback({
        type: 'failure',
        message: 'Falhou',
        subMessage: 'Cadastro não foi realizado!',
      });
    }
  };

  return (
    <section className="flex items-center min-h-screen bg-black">
      <div className="border-2 absolute right-[20rem] top-[17rem] w-[72rem] h-[68rem] border-[#E29C31]"></div>
      <div className="flex flex-auto h-full lg:max-w-4xl mx-auto bg-[#1D1D1D] rounded-lg shadow-xl my-36 relative">
        <div className="flex flex-row">
          <div className="">
            <div className="max-h-full order-r border-[#E29C31]">
              <img
                className="object-cover h-full min-w-full"
                src={welcomeBarberCadas}
                alt="img"
              />
            </div>
          </div>
          <div className="flex my-6 justify-center items-center px-20">
            <div className="max-w-full">
              <form action="" onSubmit={handleSubmit}>
                <h1 className="mb-2 text-3xl font-bold text-center text-[#E29C31] font-merriweather uppercase">
                  Cadastro
                </h1>
                <h6 className="text-center text-white text-base font-normal font-face-montserrat">
                  Insira suas informações!
                </h6>
                <div className="mt-6 mb-4">
                  <InputPadrao
                    labelTexto="Nome Completo"
                    placeholder="Insira seu nome!"
                    tipo="text"
                    nome="usu_nomeCompleto"
                    onChange={(e) => {
                      setUsuNome(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-4">
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
                <div>
                  <div className="flex flex-col mb-4">
                    <h4 className="mb-2 font-face-montserrat text-start text-white text-lg font-normal">
                      Foto de perfil
                    </h4>
                    <p className="mb-2 font-face-montserrat text-white text-sm text-start text-opacity-60">
                      Envie uma foto do seu dispositivo
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    {usu_foto ? (
                      <div className="w-20 h-20 overflow-hidden border-2 border-[#E29C31]">
                        <img
                          src={URL.createObjectURL(usu_foto)}
                          alt="Foto do usuário"
                          className="w-full h-full object-cover "
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="">
                      <InputFile
                        textoBotao="Enviar foto"
                        onChange={(e) => {
                          const file = e.target.files && e.target.files[0];
                          if (file) {
                            setUsuFoto(file);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <InputPadrao
                    labelTexto="Telefone"
                    placeholder="Digite aqui o seu telefone..."
                    tipo="text"
                    nome="cli_tel"
                    onChange={(e) => {
                      setCliTel(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-4">
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
                <div className="mb-4">
                  <InputPadrao
                    labelTexto="Confirmar senha"
                    placeholder="Confirme sua senha..."
                    tipo="password"
                    nome="usuSenhaConfirma"
                    onChange={(e) => {
                      setUsuConfirmarSenha(e.target.value);
                    }}
                  />
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
                <div className="flex justify-center mb-4">
                  <p className="text-white">
                    <a
                      href="login"
                      className="text-center text-white text-base font-normal font-face-montserrat underline"
                    >
                      Já possui conta?
                    </a>
                  </p>
                </div>
                <div className="flex justify-center">
                  <ButtonPadrao texto="Cadastrar" tipo="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CadastroCliente;
