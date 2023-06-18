interface SelectHorarioProps {
  horarioSelecionado?: string | null;
  setHorarioSelecionado?: (horario: string) => void;
}

const SelectHorario = ({
  horarioSelecionado,
  setHorarioSelecionado,
}: SelectHorarioProps) => {
  function gerarHorarios() {
    const horarios = [];
    let hora = new Date();
    hora.setHours(9, 0, 0); // Define a hora inicial como 9:00

    while (hora.getHours() < 20) {
      const horarioFormatado = hora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      horarios.push(horarioFormatado);
      hora.setTime(hora.getTime() + 30 * 60000); // Adiciona 30 minutos ao horário
    }

    return horarios;
  }

  const horarios = gerarHorarios();

  return (
    <select
      onChange={(e) =>
        setHorarioSelecionado && setHorarioSelecionado(e.target.value)
      }
      value={horarioSelecionado || ''}
      className="border border-[#0064B1] px-12 py-1 bg-white rounded-full font-face-montserrat text-2xl shadow-lg"
    >
      {horarios.map((horario, index) => (
        <option
          key={index}
          value={horario}
          className="font-face-montserrat hover:bg-[#0064B1]"
        >
          {horario}
        </option>
      ))}
    </select>
  );
};

export default SelectHorario;
