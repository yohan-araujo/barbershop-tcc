import ButtonPadrao from 'components/ButtonPadrao';
import InputPadrao from 'components/InputPadrao';
import styles from './CadastroUsuario.module.scss';

const CadastroUsuario = () => {
  return (
    <section>
      <h1>Ola essa é a página de cadastro do usuário</h1>

      <form className={styles.formCadastro}>
        <h3>Esse é o cadastro do cliente</h3>
        <InputPadrao
          labelTexto="Nome"
          placeholder="Digite aqui o seu nome.."
          tipo="text"
          nome="usuNome"
        />
        <InputPadrao
          labelTexto="E-mail"
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
        <ButtonPadrao texto="Cadastrar" />
      </form>
    </section>
  );
};

export default CadastroUsuario;
