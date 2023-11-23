import Joi from "joi";

export default function achivement({ required = true }: { required: boolean }) {
  const isRequired = !required ? Joi.string() : Joi.string().required();
  const achivementValidation = Joi.object({
    title: isRequired,
    description: isRequired,
    picture: Joi.string(),
  });

  return achivementValidation;
}
