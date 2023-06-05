import ButtonPadrao from 'components/ButtonPadrao';
import InputPadrao from 'components/InputPadrao';
import { useState } from 'react';
import axios from 'axios';

const CadastroProfissional = () => {
  const [usu_nomeCompleto, setUsuNome] = useState('');
  const [usu_email, setUsuEmail] = useState('');
  const [usu_foto, setUsuFoto] = useState('');
  const [usu_senha, setUsuSenha] = useState('');
  const [usu_confirmaSenha, setUsuConfirmarSenha] = useState('');
  const [pro_descricao, setProDescricao] = useState('');

  const submitProfissional = () => {
    axios
      .post('http://localhost:3001/api/insertUsuarioProfissional', {
        usu_nomeCompleto: usu_nomeCompleto,
        usu_email: usu_email,
        usu_senha: usu_senha,
        usu_foto: usu_foto,
        pro_descricao: pro_descricao,
      })
      .then((response) => {
        alert(response);
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('submit', {
      usu_nomeCompleto,
      usu_email,
      usu_senha,
      usu_foto,
      pro_descricao,
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
            Registrar
          </h1>
          <div className="my-5">
            <InputPadrao
              labelTexto="Nome"
              placeholder="Digite aqui o seu nome.."
              tipo="text"
              nome="usu_nomeCompleto"
              onChange={(e) => {
                setUsuNome(e.target.value);
              }}
            />

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
              labelTexto="Foto"
              placeholder="Insira o endereço da foto"
              tipo="text"
              nome="usu_foto"
              onChange={(e) => {
                setUsuFoto(e.target.value);
              }}
            />

            <InputPadrao
              labelTexto="Descricao"
              placeholder="Digite aqui uma breve descrição..."
              tipo="text"
              nome="pro_descricao"
              onChange={(e) => {
                setProDescricao(e.target.value);
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
                setUsuConfirmarSenha(e.target.value);
              }}
            />
          </div>
          <ButtonPadrao texto="Cadastrar" onClick={submitProfissional} />
        </div>
      </form>
    </section>
  );
};

export default CadastroProfissional;
