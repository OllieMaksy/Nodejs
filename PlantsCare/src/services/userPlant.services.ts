import client from "../prisma";
import { CreateUserPlantDto, UpdateUserPlantDto } from "../schemas/userPlant.schemas";

// включаємо дані рослини з каталогу у відповідь
const includePlant = {
  plant: {
    select: {
      name: true,
      species: true,
      lightning: true,
      watering: true,
      temperature: true,
      transplanting: true,
    },
  },
};


export async function getUserPlants(userId: string) {
  return await client.userPlant.findMany({
    where: { userId },
    include: includePlant,
    orderBy: { lastWater: "asc" }, // спочатку ті, яких давно не поливали
  });
}

export async function getUserPlantById(id: string, userId: string) {
  const userPlant = await client.userPlant.findFirst({
    where: { id, userId },
    include: includePlant,
  });
  if (!userPlant) throw new Error("Plant not found in your collection");
  return userPlant;
}


export async function createUserPlant(userId: string, data: CreateUserPlantDto) {
  const plant = await client.plant.findUnique({ where: { id: data.plantId } });
  if (!plant) throw new Error("Plant not found in catalog");

  return await client.userPlant.create({
    data: {
      userId,
      plantId: data.plantId,
      nickname: data.nickname,
      notes: data.notes,
    },
    include: includePlant,
  });
}

export async function updateUserPlant(id: string, userId: string, data: UpdateUserPlantDto) {
  await getUserPlantById(id, userId);

  return await client.userPlant.update({
    where: { id },
    data,
    include: includePlant,
  });
}

export async function deleteUserPlant(id: string, userId: string) {
  await getUserPlantById(id, userId); 
  await client.userPlant.delete({ where: { id } });
}