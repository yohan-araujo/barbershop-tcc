import axios from "axios";
import { useEffect, useState } from "react";
import IImage from "types/IImage";

const Galeria = () => {
  const [imagens, setImagens] = useState<IImage[]>([]);

  const fetchImagens = () => {
    axios
      .get<IImage[]>("http://localhost:3001/api/getImagens")
      .then((res) => {
        setImagens(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchImagens();
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-black">
      <p className="font-merriweather text-[#E29C31] text-center my-12 text-5xl">
        Galeria
      </p>
      <div className="flex flex-wrap justify-center gap-12 p-12">
        {imagens.length > 0 ? (
          imagens.map((imagem, index) => (
            <img
              key={index}
              src={`http://localhost:3001/uploads/${imagem.gal_nomeImagem}`}
              alt={`Imagem ${index}`}
              className="border-2 border-[#E29C31] max-w-xs h-auto mb-4 object-cover max-h-48"
            />
          ))
        ) : (
          <p className="flex justify-center text-white font-bold font-face-montserrat text-7xl my-48">
            Nenhuma foto cadastrada.
          </p>
        )}
      </div>
    </div>
  );
};

export default Galeria;
