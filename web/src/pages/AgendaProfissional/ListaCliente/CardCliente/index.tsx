import axios from 'axios';
import ButtonPadrao from 'components/ButtonPadrao';
import { useEffect, useState } from 'react';
import { IAgendamento } from 'types/IAgendamento';
import { ICliente } from 'types/ICliente';

interface CardClienteProps {
  agendamento: IAgendamento;
}

const CardCliente = ({ agendamento }: CardClienteProps) => {
  const [cliente, setCliente] = useState<ICliente | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/getCliente/${agendamento.cli_id}`
        );
        setCliente(response.data);
      } catch (error) {
        console.error('Erro ao carregar os detalhes do cliente:', error);
      }
    };

    fetchCliente();
  }, [agendamento.cli_id]);

  const urlImagem = cliente
    ? `http://localhost:3001/uploads/Clientes/${cliente.usu_id}/${cliente.usu_foto}`
    : '';

  return (
    <div className="w-[26rem] h-40 border-2 border-[#E29C31] bg-black">
      <div className="flex flex-row gap-6 my-2">
        <div className="ml-4">
          <img src={urlImagem} alt="" className="w-20 h-20 rounded-full" />
        </div>
        <div>
          <div>
            <span className="text-white font-face-montserrat text-3xl">
              {cliente ? cliente.usu_nomeCompleto : 'Carregando...'}
            </span>
          </div>
          <div>
            <span className="text-white font-face-montserrat text-xl">
              {agendamento.age_hora} - mais 30
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center">
        <ButtonPadrao texto="Pagamento" tamanho="px-8 py-1" />
        <ButtonPadrao texto="Confirmar" tamanho="px-8 py-1" />
      </div>
    </div>
  );
};

export default CardCliente;
