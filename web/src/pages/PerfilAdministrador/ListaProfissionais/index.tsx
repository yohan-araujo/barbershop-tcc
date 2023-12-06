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
          className="relative z-10 border-2 border-[#E29C31] w-24 rounded-full overflow-hidden "
        >
          <img
            alt="foto do profissional"
            src={`http://localhost:3001/uploads/Profissionais/${profissional.usu_id}/${profissional.usu_foto}`}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ListaProfissionais;
