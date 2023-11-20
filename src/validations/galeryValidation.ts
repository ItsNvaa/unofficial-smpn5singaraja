import Joi from "joi";

export default function galery({ required }: { required: boolean }) {
  const isRequired = required ? Joi.string().required() : Joi.string();
  const galeryValidation = Joi.object({
    title: isRequired,
    description: isRequired,
    picture: Joi.string(),
  });

  return galeryValidation;
}
