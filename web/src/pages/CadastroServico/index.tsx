import axios from 'axios';
import ButtonPadrao from 'components/ButtonPadrao';
import InputFile from 'components/InputFile';
import InputPadrao from 'components/InputPadrao';
import MensagemFeedback from 'components/MensagemFeedback';
import { useState } from 'react';

const CadastroServico = () => {
  const [ser_tipo, setTipo] = useState('');
  const [ser_preco, setPreco] = useState('');
  const [serFoto, setSerFoto] = useState<File | null>(null);

  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
    subMessage: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('ser_tipo', ser_tipo);
    formData.append('ser_preco', ser_preco);
    if (serFoto) formData.append('ser_foto', serFoto);

    console.log(formData)

    try {
      const response = await axios.post(
        'http://localhost:3001/api/insertServico',
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

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   console.log('submit', {
  //     tipo,
  //     preco,
  //   });
  //   axios
  //     .post('http://localhost:3001/api/insertServico', {
  //       tipo: tipo,
  //       preco: preco,
  //     })
  //     .then((response) => {
  //       setFeedback({
  //         type: 'success',
  //         message: 'Sucesso',
  //         subMessage: 'Cadastro realizado com sucesso!',
  //       });
  //     })
  //     .catch((error) => {
  //       setFeedback({
  //         type: 'failure',
  //         message: 'Falhou',
  //         subMessage: 'Cadastro não foi realizado!',
  //       });
  //     });
  // };

  console.log(ser_preco, ser_tipo)

  return (
    <section className="flex min-h-screen bg-black">
      <div className='flex flex-auto justify-center items-center'>
        <div className='relative'>
          <div className="border-2 border-[#E29C31] absolute left-3 top-3 w-[25.5rem] h-[35.2rem] " />
          <div className="flex flex-auto justify-center relative w-[25rem] z-10 bg-[#1D1D1D] rounded-lg shadow-xl">
            <div className="flex flex-col items-center">
              <div className="flex p-14 w-auto">
                <div className="max-w-full">
                  <form action="" onSubmit={handleSubmit}>
                    <h1 className="mb-4 text-5xl font-bold text-center text-[#E29C31] font-merriweather uppercase">
                      Cadastrar
                    </h1>

                    <p className="text-center mt-2 text-white text-base font-normal font-face-montserrat">
                      Adicione os serviços disponíveis no estabelecimento
                    </p>

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
                    <div>
                      <div className="flex flex-col mb-4">
                        <h4 className="mb-2 font-face-montserrat text-start text-white text-lg font-normal">
                          Foto de perfil
                        </h4>
                        <p className="mb-2 font-face-montserrat text-white text-sm text-start text-opacity-60">
                          Envie uma foto do seu dispositivo
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center mb-4">
                        {serFoto ? (
                          <div className="w-24 h-24 overflow-hidden border-2 border-[#E29C31]">
                            <img
                              src={URL.createObjectURL(serFoto)}
                              alt="Foto do usuário"
                              className="w-full h-full object-cover "
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="w-20 h-20 overflow-hidden border-2 border-[#E29C31]"></div>
                          </div>
                        )}
                        <div className="">
                          <InputFile
                            textoBotao="Enviar foto"
                            onChange={(e) => {
                              const file = e.target.files && e.target.files[0];
                              if (file) {
                                setSerFoto(file);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {feedback.message && (
                      <MensagemFeedback
                        type={feedback.type as 'failure' | 'success'}
                        message={feedback.message}
                        subMessage={feedback.subMessage}
                        onClose={() =>
                          setFeedback({ type: '', message: '', subMessage: '' })
                        }
                      />
                    )}
                    <div className="flex justify-center mt-12">
                      <ButtonPadrao texto="Cadastrar" tipo="submit" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CadastroServico;
