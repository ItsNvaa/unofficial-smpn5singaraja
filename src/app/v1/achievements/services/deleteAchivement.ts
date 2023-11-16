import client from "../../../../libs/configs/prisma";

export default async function deleteAchivementViaId(id: string): Promise<void> {
  await client.achivement.delete({
    where: { id },
  });
}
