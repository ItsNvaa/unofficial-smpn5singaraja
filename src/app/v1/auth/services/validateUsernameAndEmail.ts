import client from "../../../../libs/configs/prisma";
import { Response } from "express";
import { ErrorsResponses } from "../../../../utils/res";
import TUser from "../../users/interfaces/types/UserTypes";

export default async function validateUsernameAndEmail(
  res: Response,
  input: TUser
): Promise<void | Response<Record<any, string>>> {
  const users = await client.user.findMany({
    select: { name: true, email: true },
  });

  const username: string[] = users.map((user) => user.name);
  const email: string[] = users.map((user) => user.email);

  if (username.includes(input.name))
    return new ErrorsResponses().unprocessable(
      res,
      "The name is already taken."
    );

  if (email.includes(input.email))
    return new ErrorsResponses().unprocessable(
      res,
      "The email is already in used."
    );
}
