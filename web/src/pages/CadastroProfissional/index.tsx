import ButtonPadrao from 'components/ButtonPadrao';
import InputPadrao from 'components/InputPadrao';
import MensagemFeedback from 'components/MensagemFeedback';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ListaServicosSelect from './ListaServicosSelect';
import { IServico } from 'types/IServico';

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

      const proId = response.data.pro_id; // Obter o ID do profissional cadastrado

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
    <section className="flex items-center min-h-screen bg-age ">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-[#414141] rounded-lg shadow-xl my-12">
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
              <form onSubmit={handleSubmit}>
                <h1 className="mb-4 text-5xl font-bold text-center text-white font-face-montserrat uppercase">
                  Cadastro
                </h1>

                <div className="mt-12">
                  <InputPadrao
                    labelTexto="Nome"
                    placeholder="Digite aqui o seu nome.."
                    tipo="text"
                    nome="usu_nomeCompleto"
                    onChange={(e) => {
                      setUsuNome(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-4">
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
                    labelTexto="Endereço foto"
                    placeholder="Digite o endereço da sua foto"
                    tipo="file"
                    nome="usuEnderecoFoto"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        setUsuFoto(file);
                      }
                    }}
                  />
                </div>

                <div className="mt-4">
                  <InputPadrao
                    labelTexto="Descricao"
                    placeholder="Digite aqui uma breve descrição..."
                    tipo="text"
                    nome="pro_descricao"
                    onChange={(e) => {
                      setProDescricao(e.target.value);
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

                <div className="mt-4">
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
                  />
                )}
                <div className="mt-4">
                  <div className="mt-4">
                    <ListaServicosSelect
                      servicos={listaServicos}
                      onServicoSelecionado={handleServicosSelecionados}
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-12">
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

export default CadastroProfissional;
