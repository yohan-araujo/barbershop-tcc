import { Scissors, LucideIcon, PocketKnife, Paintbrush } from 'lucide-react';
import { ISkill } from 'types/ISkill';

interface SkillsComIConsProps {
  skills: ISkill[];
}

const skillsIcons: Record<string, LucideIcon> = {
  'Corte de Cabelo': Scissors,
  Barba: PocketKnife,
  Pintura: Paintbrush,
};

const SkillsComICons = ({ skills }: SkillsComIConsProps) => {
  if (!skills) {
    return null; // Ou pode retornar uma mensagem de fallback, por exemplo
  }
  const renderedIcons = skills.map((skill, index) => {
    const { ser_tipo } = skill;
    const IconeComponente = skillsIcons[ser_tipo]; // Obtém o ícone correspondente ao serviço
    return (
      <div
        key={index}
        className="w-8 h-8 rounded-full bg-[#D9D9D9] flex justify-center"
      >
        <IconeComponente className="mt-1" />
      </div>
    );
  });

  return (
    <div className="flex justify-center space-x-4 mt-5">{renderedIcons}</div>
  );
};

export default SkillsComICons;
