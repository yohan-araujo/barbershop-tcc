import axios from 'axios';
import ButtonPadrao from 'components/ButtonPadrao';
import InputPadrao from 'components/InputPadrao';
import { useState } from 'react';

const CadastroServico = () => {
  const [tipo, setTipo] = useState('');
  const [preco, setPreco] = useState('');

  const submitProfissional = () => {
    axios
      .post('http://localhost:3001/api/insertServico', {
        tipo: tipo,
        preco: preco,
      })
      .then((response) => {
        alert(response);
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('submit', {
      tipo,
      preco,
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
            Cadastrar
          </h1>
          <div className="my-5">
            <InputPadrao
              labelTexto="Tipo"
              placeholder="Digite o tipo do servico.."
              tipo="text"
              nome="ser_tipo"
              onChange={(e) => {
                setTipo(e.target.value);
              }}
            />

            <InputPadrao
              labelTexto="Preco"
              placeholder="Digite o preco do servico..."
              tipo="text"
              nome="ser_preco"
              onChange={(e) => {
                setPreco(e.target.value);
              }}
            />
          </div>
          <ButtonPadrao texto="Cadastrar" onClick={submitProfissional} />
        </div>
      </form>
    </section>
  );
};

export default CadastroServico;
