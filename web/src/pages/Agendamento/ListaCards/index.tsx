import { useState } from 'react';
import Card from 'components/Card';
import { IProfissional } from 'types/IProfissional';

interface ListaCardProps {
  profissionais: IProfissional[];
  onProfissionalSelecionado: (profissional: IProfissional) => void;
}

const ListaCards = ({
  profissionais,
  onProfissionalSelecionado,
}: ListaCardProps) => {
  const [cardSelecionadoID, setCardSelecionadoID] = useState<number | null>(
    null
  );

  const handleCardClick = (id: number) => {
    setCardSelecionadoID((cardSelecionadoAntigo) => {
      const novoCardSelecionado = cardSelecionadoAntigo === id ? null : id;
      const profissionalSelecionado = profissionais.find(
        (profissional) => profissional.pro_id === novoCardSelecionado
      );
      if (profissionalSelecionado === undefined) {
      } else {
        onProfissionalSelecionado(profissionalSelecionado);
      }

      return novoCardSelecionado;
    });
  };

  return (
    <div className="flex flex-col gap-12 mx-auto justify-center">
      {profissionais.map((profissional) => (
        <Card
          key={profissional.pro_id}
          profissional={profissional}
          aoSelecionado={profissional.pro_id === cardSelecionadoID}
          onClick={() => handleCardClick(profissional.pro_id)}
        />
      ))}
    </div>
  );
};

export default ListaCards;
