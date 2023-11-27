import { IAgendamento } from 'types/IAgendamento';

interface ListaHorariosProps {
  agendamentos: IAgendamento[];
}

const ListaHorarios = ({ agendamentos }: ListaHorariosProps) => {
  return (
    <div className="relative">
      <div className="absolute top-2 left-8 h-[19rem] w-[40.5rem] border-2 border-[#E29C31]"></div>
      <div className="bg-black shadow-inner p-5 relative z-10">
        <div className="text-white h-[15.5rem] overflow-y-auto">
          <div className="grid grid-cols-5 gap-0 text-center">
            <div className="font-face-montserrat px-8 py-2">Tipo</div>
            <div className="font-face-montserrat px-4 py-2">Data</div>
            <div className="font-face-montserrat px-4 py-2">Hora</div>
            <div className="font-face-montserrat px-4 py-2">Profissional</div>
            <div className="font-face-montserrat px-4 py-2">Preço</div>
          </div>
          {agendamentos.map((horario) => {
            return (
              <div
                key={horario.age_id}
                className={
                  horario.age_status
                    ? 'grid grid-cols-5 gap-0 my-2'
                    : 'highlighted-row grid grid-cols-5 gap-0 my-2 '
                }
              >
                <div className="flex flex-row font-face-montserrat text-center px-2 py-2 ">
                  <div className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white mr-2 text-black">
                    icon
                  </div>
                  <div className="font-face-montserrat mt-2">
                    {horario.ser_tipo}
                  </div>
                </div>
                <div className="font-face-montserrat text-center py-2 mt-2">
                  {new Date(horario.age_data).toLocaleDateString('pt-BR')}
                </div>
                <div className="font-face-montserrat text-center py-2 mt-2">
                  {horario.age_hora.substring(0, 5)}
                </div>
                <div className="font-face-montserrat text-center py-2 mt-2">
                  {horario.usu_nomeCompleto}
                </div>
                <div className="font-face-montserrat text-center py-2 mt-2">
                  {horario.ser_preco != 0
                    ? `R$ ${horario.ser_preco.toFixed(2)}`
                    : 'Gratuito'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListaHorarios;
