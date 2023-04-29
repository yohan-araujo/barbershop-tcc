import { useState, useEffect } from 'react';
import styles from './TabelaServicos.module.scss';
import { IServico } from 'types/IServico';

interface TabelaServicosProps {
  servicos: IServico[];
}

const TabelaServicos = ({ servicos }: TabelaServicosProps) => {
  const [servicoSelecionado, setServicoSelecionado] = useState<IServico | null>(
    null
  );

  const handleServicoSelecionado = (servico: IServico) => {
    setServicoSelecionado((servicoSelecionadoAntigo) => {
      if (servicoSelecionadoAntigo === servico) {
        return null;
      }
      return servico;
    });
  };

  useEffect(() => {
    console.log(servicoSelecionado);
  }, [servicoSelecionado]);

  return (
    <table className={styles.tabelaServicos}>
      <thead className={styles.tabelaServicos__headTabela}>
        <tr>
          <th>Tipo</th>
          <th>Preço</th>
          <th>Selecionar</th>
        </tr>
      </thead>
      <tbody className={styles.tabelaServicos__bodyTabela}>
        {servicos.map((servico) => (
          <tr key={servico.id}>
            <td>{servico.tipo}</td>
            <td>R$ {servico.preco.toFixed(2)}</td>
            <td>
              <input
                type="checkbox"
                value={servico.id}
                checked={servicoSelecionado === servico}
                onChange={() => handleServicoSelecionado(servico)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaServicos;
