import Joi from "joi";
import TUser from "../app/v1/users/interfaces/types/UserTypes";
import defaultUserImage from "../const/readonly/defaultUserImage";

const user = ({ required = true }: { required?: boolean }) => {
  const isRequired = !required ? Joi.string() : Joi.string().required();
  const userValidation = Joi.object<TUser>({
    name: isRequired.max(20),
    email: isRequired.email(),
    password: isRequired,
    gender: Joi.string().default("Non-binary"),
    picture: Joi.string().default(defaultUserImage),
    age: Joi.number().min(12).default(0),
    role: Joi.string().allow(null),
    refreshToken: Joi.string().allow(null),
  });

  return userValidation;
};

export default user;
