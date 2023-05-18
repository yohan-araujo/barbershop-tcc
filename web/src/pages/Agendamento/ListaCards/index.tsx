import { useState } from 'react';
import Card from 'components/Card';
import { IProfissional } from 'types/IProfissional';

interface ListaCardProps {
  profissionais: IProfissional[];
}

const ListaCards = ({ profissionais }: ListaCardProps) => {
  const [cardSelecionadoID, setCardSelecionadoID] = useState<number | null>(
    null
  );
  const handleCardClick = (id: number) => {
    setCardSelecionadoID((cardSelecionadoAntigo) => {
      const novoCardSelecionado = cardSelecionadoAntigo === id ? null : id;
      const profissionalSelecionado = profissionais.find(
        (profissional) => profissional.usu_id === novoCardSelecionado
      );
      if (profissionalSelecionado === undefined) {
        console.log('Profissional selecionado: Nenhum');
      } else {
        console.log('Profissional selecionado:', profissionalSelecionado);
      }

      return novoCardSelecionado;
    });
  };

  return (
    <div className="flex justify-around mt-32 flex-wrap">
      {profissionais.map((profissional) => (
        <Card
          key={profissional.usu_id}
          profissional={profissional}
          aoSelecionado={profissional.usu_id === cardSelecionadoID}
          onClick={() => handleCardClick(profissional.usu_id)}
        />
      ))}
    </div>
  );
};

export default ListaCards;
