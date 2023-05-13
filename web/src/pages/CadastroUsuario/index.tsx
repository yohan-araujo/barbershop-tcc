import ButtonPadrao from 'components/ButtonPadrao';
import InputPadrao from 'components/InputPadrao';

const CadastroUsuario = () => {
  return (
    <section>
      <form className="flex flex-col items-center my-20">
        <div className="text-center rounded-md bg-[#414141] p-14">
          <h1 className="text-white text-4xl font-face-montserrat uppercase font-medium">
            Registrar
          </h1>
          <div className="my-5">
            <InputPadrao
              labelTexto="Nome"
              placeholder="Digite aqui o seu nome.."
              tipo="text"
              nome="usuNome"
            />

            <InputPadrao
              labelTexto="Email"
              placeholder="Digite aqui o seu email..."
              tipo="email"
              nome="usuEmail"
            />

            <InputPadrao
              labelTexto="Telefone"
              placeholder="Digite aqui o seu telefone..."
              tipo="text"
              nome="usuTel"
            />

            <InputPadrao
              labelTexto="Senha"
              placeholder="Digite aqui a sua senha..."
              tipo="password"
              nome="usuSenha"
            />

            <InputPadrao
              labelTexto="Confirmar senha"
              placeholder="Confirme sua senha..."
              tipo="password"
              nome="usuSenhaConfirma"
            />
          </div>
          <ButtonPadrao texto="Cadastrar" />
        </div>
      </form>
    </section>
  );
};

export default CadastroUsuario;
