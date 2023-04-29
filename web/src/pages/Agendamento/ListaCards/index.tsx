import { useState } from 'react';
import styles from './ListaCards.module.scss';
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
        (profissional) => profissional.id === novoCardSelecionado
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
    <div className={styles.listaCards}>
      {profissionais.map((profissional) => (
        <Card
          key={profissional.id}
          profissional={profissional}
          aoSelecionado={profissional.id === cardSelecionadoID}
          onClick={() => handleCardClick(profissional.id)}
        />
      ))}
    </div>
  );
};

export default ListaCards;
