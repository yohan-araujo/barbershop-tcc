import { ISkill } from 'types/ISkill';

interface SkillsProps {
  skills: ISkill[];
}

const Skills = ({ skills }: SkillsProps) => {
  return (
    <>
      {skills.map((skill: ISkill, index) => (
        <div
          className="flex justify-between bg-[#677381] rounded-xl px-12 py-1 ml-2 shadow-inner"
          key={index}
        >
          <span className="text-white font-face-montserrat">
            {skill.ser_tipo}
          </span>
        </div>
      ))}
    </>
  );
};

export default Skills;
