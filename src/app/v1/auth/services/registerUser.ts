import client from "../../../../libs/configs/prisma";
import { SuccessResponses } from "../../../../utils/res";
import TUser from "../../users/interfaces/types/UserTypes";
import { Response } from "express";

export default async function registerUser(
  res: Response,
  value: TUser,
  password: string,
  imagePath: string
): Promise<Response> {
  await client.user.create({
    data: { ...value, password, picture: imagePath },
  });

  return new SuccessResponses().success(res, "created", "create");
}
