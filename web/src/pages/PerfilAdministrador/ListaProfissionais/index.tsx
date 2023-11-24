import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IProfissional } from 'types/IProfissional';

interface ListaProfissionaisProps {
  profissionais: IProfissional[];
}

const ListaProfissionais = ({ profissionais }: ListaProfissionaisProps) => {
  return (
    <div className="flex -space-x-5">
      {profissionais.map((profissional) => (
        <div
          key={profissional.pro_id}
          className="relative z-10 border-2 border-[#0064B1] w-24 rounded-full overflow-hidden "
        >
          <img
            alt="foto do profissional"
            src={`http://localhost:3001/uploads/Profissionais/${profissional.usu_id}/${profissional.usu_foto}`}
            className="object-cover"
          />
        </div>
      ))}
      <div className="relative z-10 border-2 border-[#0064B1] w-24 rounded-full overflow-hidden bg-[#0064B1] opacity-95">
        <Link to="/cadastroProfissional" className="text-white">
          <Plus className="ml-7 mt-7" size={32} />
        </Link>
      </div>
    </div>
  );
};

export default ListaProfissionais;
