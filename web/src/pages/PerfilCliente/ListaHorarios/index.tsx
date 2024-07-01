import { IAgendamento } from "types/IAgendamento";

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
            <div className="font-face-montserrat px-8 py-2 font-bold">Tipo</div>
            <div className="font-face-montserrat px-4 py-2 font-bold">Data</div>
            <div className="font-face-montserrat px-4 py-2 font-bold">Hora</div>
            <div className="font-face-montserrat px-4 py-2 font-bold">
              Profissional
            </div>
            <div className="font-face-montserrat px-4 py-2 font-bold">
              Preço
            </div>
          </div>
          {agendamentos.map((horario) => {
            return (
              <div
                key={horario.age_id}
                className={
                  horario.age_status
                    ? "grid grid-cols-5 gap-0 my-2"
                    : "highlighted-row grid grid-cols-5 gap-0 my-2 "
                }
              >
                <div className="flex flex-row items-center text-center space-x-12 py-2 px-12">
                  <div className="font-face-montserrat">
                    {horario.ser_tipo}
                  </div>

                  <div className="font-face-montserrat">
                    {new Date(horario.age_data).toLocaleDateString("pt-BR")}
                  </div>

                  <div className="font-face-montserrat">
                    {horario.age_hora.substring(0, 5)}
                  </div>

                  <div className="font-face-montserrat">
                    {horario.usu_nomeCompleto}
                  </div>

                  <div className="font-face-montserrat">
                    {horario.ser_preco !== 0
                      ? `R$ ${horario.ser_preco.toFixed(2)}`
                      : "Gratuito"}
                  </div>
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
