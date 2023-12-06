import axios from 'axios';
import ButtonPadrao from 'components/ButtonPadrao';
import DropdownValue from 'components/DropdownValue';
import { useEffect, useState } from 'react';
import { IAgendamento } from 'types/IAgendamento';
import { ICliente } from 'types/ICliente';
import { IOption } from 'types/IOptions';
import { CreditCard, DollarSign, Smartphone } from 'lucide-react';

interface CardClienteProps {
  agendamento: IAgendamento;
  onConfirmarAgendamento: (
    agendamentoId: number,
    formaPagamento: string
  ) => void;
}

const CardCliente: React.FC<CardClienteProps> = ({
  agendamento,
  onConfirmarAgendamento,
}) => {
  const [cliente, setCliente] = useState<ICliente | null>(null);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

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

  const handleOptionChange = (option: IOption | null) => {
    setSelectedOption(option);
  };

  const handleConfirmar = async () => {
    if (selectedOption) {
      try {
        await onConfirmarAgendamento(agendamento.age_id, selectedOption.value);
        // Aqui você pode adicionar lógica para atualizar a interface, se necessário
      } catch (error) {
        console.error('Erro ao confirmar agendamento:', error);
      }
    }
  };

  const isButtonDisabled = !selectedOption;

  return (
    <div className="w-[26rem] h-40 border-2 border-[#E29C31] bg-black my-4">
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
        <DropdownValue
          options={[
            {
              label: 'Pix',
              icon: <Smartphone />,
              value: 'Pix',
            },
            { label: 'Dinheiro', icon: <DollarSign />, value: 'Dinheiro' },
            {
              label: 'Cartão de crédito',
              icon: <CreditCard />,
              value: 'Cartão de Crédito',
            },
          ]}
          onSelect={handleOptionChange}
        />
        <ButtonPadrao
          texto="Confirmar"
          tamanho="px-8 py-1"
          disabled={isButtonDisabled}
          onClick={handleConfirmar}
        />
      </div>
    </div>
  );
};

export default CardCliente;
