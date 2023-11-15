import client from "../../../../libs/configs/prisma";

export default async function deleteUserViaClient(id: string): Promise<void> {
  await client.user.delete({
    where: { id },
  });
}
