interface IFotoGaleria {
  gal_id: number;
  gal_imagem: {
    type: string;
    data: number[]; // Ou qualquer tipo apropriado para os dados binários
  };
  pro_id: number;
}

export default IFotoGaleria;
