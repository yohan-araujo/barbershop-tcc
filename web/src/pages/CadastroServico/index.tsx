import axios from 'axios';
import ButtonPadrao from 'components/ButtonPadrao';
import InputPadrao from 'components/InputPadrao';
import { useState } from 'react';

const CadastroServico = () => {
  const [tipo, setTipo] = useState('');
  const [preco, setPreco] = useState('');

  const submitServico = () => {
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
                  Cadastrar
                </h1>

                <div className="mt-12">
                  <InputPadrao
                    labelTexto="Tipo"
                    placeholder="Digite o tipo do servico.."
                    tipo="text"
                    nome="ser_tipo"
                    onChange={(e) => {
                      setTipo(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-4">
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

                <div className="flex justify-center mt-12">
                  <ButtonPadrao
                    texto="Cadastrar"
                    tipo="submit"
                    onClick={submitServico}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CadastroServico;
