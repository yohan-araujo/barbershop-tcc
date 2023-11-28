import axios from "axios";
import ButtonPadrao from "components/ButtonPadrao";
import InputFile from "components/InputFile";
import MensagemFeedback from "components/MensagemFeedback";
import { ChangeEvent, useState } from "react";

const CadastroGaleria = () => {
  const [arquivos, setArquivos] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
    subMessage: "",
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setArquivos(event.target.files);

      const urls = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (arquivos) {
      const formData = new FormData();
      for (let i = 0; i < arquivos.length; i++) {
        formData.append("images", arquivos[i]);
      }

      axios
        .post("http://localhost:3001/api/uploadImagens", formData)
        .then((response) => {
          setFeedback({
            type: "success",
            message: "Sucesso",
            subMessage: "Agendamento realizado com sucesso!",
          });
        })
        .catch((error) => {
          setFeedback({
            type: "failure",
            message: "Falhou",
            subMessage: "Cadastro não foi realizado!",
          });
        });
    } else {
      console.error("Nenhum arquivo selecionado");
    }
  };

  return (
    <section className="flex min-h-screen bg-black">
      <div className="flex flex-auto justify-center">
        <div className="relative">
          <div className="border-2 absolute left-[2rem] top-[10rem] w-[63rem] h-[52rem] border-[#E29C31]"></div>
          <div className="bg-[#1D1D1D] w-[64rem] h-[52rem] rounded-lg shadow-xl my-36 py-12 relative z-10">
            <div className="flex flex-col">
              <div className="flex flex-col text-center mt-6">
                <span className="text-5xl text-[#E29C31] font-bold font-merriweather">
                  {" "}
                  Cadastro de fotos
                </span>
                <span className="font-face-montserrat text-xl text-white mt-4">
                  Selecione fotos para exibir na aba de galeria.
                </span>
              </div>
              <form onSubmit={handleOnSubmit}>
                <div className="flex flex-row mt-12">
                  <div className="w-1/2 ">
                    <div className="flex justify-center ml-12">
                      {arquivos ? (
                        <div className="grid grid-cols-3 gap-4">
                          {previewUrls.map((url, index) => (
                            <div
                              key={index}
                              className="overflow-hidden border-2 border-[#E29C31]"
                            >
                              <img
                                src={url}
                                alt={`Foto ${index}`}
                                className="w-full h-32 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <span className="text-3xl text-white font-face-montserrat font-bold mt-52">
                            As fotos irão aparecer aqui
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex w-1/2">
                    <div className="flex flex-col ml-48 mt-40">
                      <div className="flex justify-center">
                        <InputFile
                          onChange={handleOnChange}
                          textoBotao="Selecionar fotos"
                          multiple={true}
                        />
                      </div>
                      <div className="flex justify-center mt-6">
                        <ButtonPadrao texto="Enviar" />
                      </div>
                      {feedback.message && (
                        <MensagemFeedback
                          type={feedback.type as "failure" | "success"}
                          message={feedback.message}
                          subMessage={feedback.subMessage}
                          onClose={() =>
                            setFeedback({
                              type: "",
                              message: "",
                              subMessage: "",
                            })
                          }
                          redirectTo="/galeria"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CadastroGaleria;
