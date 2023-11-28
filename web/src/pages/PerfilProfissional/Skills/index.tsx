import { ISkill } from 'types/ISkill';

interface SkillsProps {
  skills: ISkill[];
}

const Skills = ({ skills }: SkillsProps) => {
  return (
    <>
      {skills.map((skill: ISkill, index) => (
        <div
          className="flex justify-between bg-[#E29C31] px-12 py-1 ml-2 shadow-inner"
          key={index}
        >
          <span className="text-white font-face-montserrat uppercase font-bold">
            {skill.ser_tipo}
          </span>
        </div>
      ))}
    </>
  );
};

export default Skills;
