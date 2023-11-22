import { ISkill } from './ISkill';

export interface IProfissional {
  usu_id: number;
  pro_id: number;
  usu_nomeCompleto: string;
  usu_foto: string;
  pro_descricao: string;
  skills: ISkill[];
}
