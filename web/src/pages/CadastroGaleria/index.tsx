import axios from 'axios';
import { ChangeEvent, useState } from 'react';

const CadastroGaleria = () => {
  const [arquivos, setArquivos] = useState<FileList | null>(null);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setArquivos(event.target.files);
    }
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (arquivos) {
      const formData = new FormData();
      for (let i = 0; i < arquivos.length; i++) {
        formData.append('images', arquivos[i]);
      }

      axios
        .post('http://localhost:3001/api/uploadImagens', formData)
        .then((res) => {
          if (res.data.Status === 'success') {
            console.log('imagens cadastradas com sucesso');
          } else {
            console.log('falhou');
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.error('Nenhum arquivo selecionado');
    }
  };

  return (
    <div>
      <span>Cadastro de fotos</span>
      <form onSubmit={handleOnSubmit}>
        <input type="file" onChange={handleOnChange} multiple />
        <button type="submit">Fazer Upload</button>
      </form>
    </div>
  );
};

export default CadastroGaleria;
