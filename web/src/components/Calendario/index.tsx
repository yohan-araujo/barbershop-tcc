import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { meses } from 'json';

interface CalendarioProps {
  onDiaSelecionado: (dia: Dayjs | null) => void;
}

const Calendario = ({ onDiaSelecionado }: CalendarioProps) => {
  const dataAtual = dayjs();
  const [mesAtual, setMesAtual] = useState(dataAtual);
  const [diaSelecionado, setDiaSelecionado] = useState<Dayjs | null>(null);

  const gerarData = (mes = dayjs().month(), ano = dayjs().year()) => {
    const primeiraDataDoMes = dayjs().year(ano).month(mes).startOf('month');
    const ultimaDataDoMes = dayjs().year(ano).month(mes).endOf('month');

    const arrayData = [];

    //gerar data prefixa
    for (let i = 0; i < primeiraDataDoMes.day(); i++) {
      const data = ultimaDataDoMes.day(i);

      arrayData.push({
        mesAtual: false,
        data,
      });
    }

    //gerar data atual
    for (let i = primeiraDataDoMes.date(); i <= ultimaDataDoMes.date(); i++) {
      arrayData.push({
        mesAtual: true,
        data: primeiraDataDoMes.date(i),
        hoje:
          primeiraDataDoMes.date(i).toDate().toDateString() ===
          dayjs().toDate().toDateString(),
      });
    }

    //gerando dias inativos dos proximos e antigos meses
    const diasRestantes = 42 - arrayData.length;

    for (
      let i = ultimaDataDoMes.date() + 1;
      i <= ultimaDataDoMes.date() + diasRestantes;
      i++
    ) {
      arrayData.push({ mesAtual: false, data: ultimaDataDoMes.date(i) });
    }

    return arrayData;
  };

  const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  function cn(...classes: string[]) {
    return classes.filter(Boolean).join('');
  }

  const selecionarDia = (dia: Dayjs) => {
    if (diaSelecionado && diaSelecionado.isSame(dia, 'day')) {
      setDiaSelecionado(null);
      onDiaSelecionado(null);
    } else {
      setDiaSelecionado(dia);
      onDiaSelecionado(dia);
    }
  };

  return (
    <div className="w-96 h-96">
      <div className="flex justify-between">
        <h1 className=" text-[#E29C31] my-2">
          <span className="text-[#E29C31] font-face-montserrat font-bold text-2xl">
            {meses[mesAtual.month()]},
          </span>{' '}
          <span className="text-white font-face-montserrat font-bold text-2xl">
            {mesAtual.year()}
          </span>
        </h1>
        <div className="flex items-center gap-5 my-2">
          <ChevronLeft
            className="w-5 h-5 cursor-pointer text-white"
            onClick={() => {
              setMesAtual(mesAtual.month(mesAtual.month() - 1));
            }}
          />
          <h1
            className="cursor-pointer text-white font-face-montserrat font-bold"
            onClick={() => {
              setMesAtual(dataAtual);
            }}
          >
            Hoje
          </h1>
          <ChevronRight
            className="w-5 h-5 cursor-pointer text-white"
            onClick={() => {
              setMesAtual(mesAtual.month(mesAtual.month() + 1));
            }}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-7 bg-black font-medium">
        {dias.map((dia, index) => {
          return (
            <h1
              key={index}
              className="h-14 grid place-content-center text-white font-face-montserrat text-xl"
            >
              {dia}
            </h1>
          );
        })}
      </div>
      <div className="w-full grid grid-cols-7 bg-black rounded">
        {gerarData(mesAtual.month(), mesAtual.year()).map(
          ({ mesAtual, data, hoje }, index) => {
            return (
              <div
                key={index}
                className="h-14 w-14 grid place-content-center text-xl"
              >
                <h1
                  className={`${cn(
                    mesAtual ? '' : 'opacity-50 h-10 w-10 cursor',
                    hoje ? 'bg-[#E29C31] h-10 w-10' : '',
                    diaSelecionado && diaSelecionado.isSame(data, 'day')
                      ? 'grid place-content-center bg-[#E29C31] h-10 w-10 text-black rounded-[4px] cursor-pointer font-inter'
                      : 'h-10 w-10 grid place-content-center rounded-[4px] text-white hover:bg-[#E29C31] hover:text-black transition-all cursor-pointer font-inter'
                  )}`}
                  onClick={() => selecionarDia(data)}
                >
                  {data.date()}
                </h1>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Calendario;
