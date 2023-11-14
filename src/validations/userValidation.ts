import Joi from "joi";

const user = Joi.object({
  name: Joi.string().required().max(20),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  gender: Joi.string().default("Non-binary"),
  picture: Joi.string(),
  age: Joi.number().min(12).default(0),
  role: Joi.string().allow(null),
  refreshToken: Joi.string().allow(null),
});

export default user;
