import styles from './Agendamento.module.scss';
import InputPadrao from 'components/InputPadrao';
import ButtonPadrao from 'components/ButtonPadrao';
import ListaCards from './ListaCards';
import profissionais from '../../json/profissionais.json';
import TabelaServicos from './TabelaServicos';
import servicos from '../../json/servicos.json';

const Agendamento = () => {
  return (
    <>
      <section>
        <form action="" className={styles.formAgendamento}>
          <h1>Seleção do Profissional</h1>

          <ListaCards profissionais={profissionais} />

          <h1>Seleção de serviço</h1>

          <TabelaServicos servicos={servicos} />

          <h1>Seleção de data e hora</h1>

          <InputPadrao
            labelTexto="Data"
            tipo="date"
            placeholder="Digite uma data"
          />
          <InputPadrao
            labelTexto="Hora"
            tipo="time"
            placeholder="Digite uma data"
          />

          <ButtonPadrao texto="Agendar!" />
        </form>
      </section>
    </>
  );
};

export default Agendamento;
