import Joi from "joi";
import TeacherType from "../app/v1/teachers/interfaces/types/TeacherTypes";

export default function teacher({ required }: { required: boolean }) {
  const isRequired = required ? Joi.string().required() : Joi.string();
  const teacherValidation = Joi.object<TeacherType>({
    fullname: isRequired,
    gender: isRequired,
    NIP: required ? Joi.number().required() : Joi.number(),
    grade: Joi.string(),
    class: Joi.string(),
    email: Joi.string().email(),
    picture: Joi.string(),
    profile: Joi.string(),
  });

  return teacherValidation;
}
