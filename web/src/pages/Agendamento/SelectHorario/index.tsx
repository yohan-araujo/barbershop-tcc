interface SelectHorarioProps {
  horarioSelecionado?: string | null;
  setHorarioSelecionado?: (horario: string | null) => void; // Alterado para aceitar null
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

  const handleHorarioClick = (horario: string) => {
    if (horarioSelecionado === horario) {
      // Se o horário clicado já estiver selecionado, desselecione-o
      setHorarioSelecionado && setHorarioSelecionado(null);
    } else {
      // Senão, selecione o horário clicado
      setHorarioSelecionado && setHorarioSelecionado(horario);
    }
  };

  return (
    <ul className="font-face-montserrat text-2xl max-h-[28rem] overflow-y-auto p-0 list-none">
      {horarios.map((horario, index) => (
        <li
          key={index}
          onClick={() => handleHorarioClick(horario)}
          className={`mx-4 border-2 border-[#E29C31] py-2 px-6 hover:bg-[#E29C31] hover:text-black cursor-pointer my-6 text-center text-white font-face-montserrat font-bold ${
            horarioSelecionado === horario
              ? 'bg-[#E29C31] font-bold text-black'
              : ''
          }`}
          style={{
            color: horarioSelecionado === horario ? '#000' : '',
          }}
        >
          {horario}
        </li>
      ))}
    </ul>
  );
};

export default SelectHorario;
