import Joi from "joi";
import TArticle from "../interfaces/types/ArticlesTypes";

export default function article({ required = true }: { required: boolean }) {
  const isRequired = required ? Joi.string().required() : Joi.string();

  const articleValidation = Joi.object<TArticle>({
    title: isRequired,
    description: isRequired,
    author: isRequired,
    body: isRequired,
    picture: Joi.string(),
    createdAt: Joi.string(),
    updatedAt: Joi.string(),
  });

  return articleValidation;
}
