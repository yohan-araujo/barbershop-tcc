import ButtonPadrao from 'components/ButtonPadrao';
import InputPadrao from 'components/InputPadrao';
import MensagemFeedback from 'components/MensagemFeedback';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ListaServicosSelect from './ListaServicosSelect';
import { IServico } from 'types/IServico';
import InputFile from 'components/InputFile';

const CadastroProfissional = () => {
  const [usu_nomeCompleto, setUsuNome] = useState('');
  const [usu_email, setUsuEmail] = useState('');
  const [usu_foto, setUsuFoto] = useState<File | null>(null);
  const [usu_senha, setUsuSenha] = useState('');
  const [usu_confirmaSenha, setUsuConfirmarSenha] = useState('');
  const [pro_descricao, setProDescricao] = useState('');
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
    subMessage: '',
  });
  const [listaServicos, setListaServicos] = useState<IServico[]>([]);
  const [servicosSelecionados, setServicosSelecionados] = useState<
    IServico[] | null
  >([]);

  const handleServicosSelecionados = (servico: IServico[]) => {
    setServicosSelecionados(servico);
  };

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
    formData.append('pro_descricao', pro_descricao);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/insertUsuarioProfissional',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const proId = response.data.pro_id;

      await axios.post('http://localhost:3001/api/insertServicosProfissional', {
        servicos: servicosSelecionados,
        pro_id: proId,
      });

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

  useEffect(() => {
    axios
      .get<IServico[]>('http://localhost:3001/api/getServicosCadastrados')
      .then((response) => {
        setListaServicos(response.data);
      });
  }, []);

  return (
    <section className="flex flex-1 min-h-screen bg-black">
      <div className="flex flex-auto mx-40 bg-[#1D1D1D]">
        <div className="flex flex-auto justify-center">
          <div className="relative">
            <div className="border-2 absolute left-[5rem] top-[11rem] w-[36rem] h-[89rem] border-[#E29C31]"></div>
            <div className="bg-black rounded-lg shadow-xl my-36 relative z-10 w-[40rem]">
              <div className="flex my-6 justify-center items-center">
                <div className="w-full">
                  <form onSubmit={handleSubmit} className="m-24">
                    <h1 className="mb-2 text-4xl font-bold text-center text-[#E29C31] font-merriweather uppercase">
                      Cadastro
                    </h1>
                    <div className="mt-12">
                      <InputPadrao
                        labelTexto="Nome Completo"
                        placeholder="Digite aqui o seu nome.."
                        tipo="text"
                        nome="usu_nomeCompleto"
                        onChange={(e) => {
                          setUsuNome(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-6">
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
                    <div className="mt-6">
                      <div className="flex flex-col mb-4">
                        <h4 className="mb-2 font-face-montserrat text-start text-white text-lg font-normal">
                          Foto de perfil
                        </h4>
                        <p className="mb-2 font-face-montserrat text-white text-sm text-start text-opacity-60">
                          Envie uma foto do seu dispositivo
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center mb-4">
                        {usu_foto ? (
                          <div className="w-20 h-20 overflow-hidden border-2 border-[#E29C31]">
                            <img
                              src={URL.createObjectURL(usu_foto)}
                              alt="Foto do usuário"
                              className="w-full h-full object-cover "
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 overflow-hidden border-2 border-[#E29C31]"></div>
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
                    <div className="mt-6">
                      <InputPadrao
                        labelTexto="Telefone"
                        placeholder="Digite aqui o seu telefone..."
                        tipo="text"
                        nome="usu_email"
                        onChange={(e) => {
                          setUsuEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-6">
                      <InputPadrao
                        labelTexto="Descrição"
                        placeholder="Digite uma breve descrição..."
                        tipo="text"
                        nome="usu_descricao"
                        onChange={(e) => {
                          setProDescricao(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-6">
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
                    <div className="mt-6">
                      <InputPadrao
                        labelTexto="Senha"
                        placeholder="Digite aqui a sua senha..."
                        tipo="password"
                        nome="usu_senha"
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
                      />
                    )}
                    <div className="mt-6">
                      <div className="mt-4">
                        <ListaServicosSelect
                          servicos={listaServicos}
                          onServicoSelecionado={handleServicosSelecionados}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center mt-14">
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

export default CadastroProfissional;
