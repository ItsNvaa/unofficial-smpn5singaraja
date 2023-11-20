import client from "../../../../libs/configs/prisma";

export default async function deleteGaleryViaId(id: string): Promise<void> {
  await client.galery.delete({
    where: { id },
  });
}
