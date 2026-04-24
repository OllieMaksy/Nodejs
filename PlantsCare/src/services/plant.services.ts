import client from "../prisma";
import { CreatePlantDto, UpdatePlantDto, PlantQueryDto } from "../schemas/plant.schemas";

export async function getAllPlants(query: PlantQueryDto) {
  const { page, limit, name } = query;
  const skip = (page - 1) * limit;
 
  const where = name
    ? { name: { contains: name, mode: "insensitive" as const } }
    : {};
 
  const [plants, total] = await Promise.all([
    client.plant.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: "asc" },
    }),
    client.plant.count({ where }),
  ]);
 
  return {
    data: plants,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getPlantById(id: string) {
  const plant = await client.plant.findUnique({ where: { id } });
  if (!plant) throw new Error("Plant not found");
  return plant;
}

export async function getPlantByName(name: string) {
  const plant = await client.plant.findFirst({
    where: {
      name: {
        equals: name,
      },
    },
  });
  if (!plant) throw new Error(`Plant "${name}" not found`);
  return plant;
}
export async function getPlantsByCategory(species: string) {
  const plant = await client.plant.findMany({
    where: { species: { contains: species } },
  });
  if (!plant.length) throw new Error(`No plants found in category "${species}"`);
  return plant;
}

export async function createPlant(data: CreatePlantDto) {
  return await client.plant.create({ data });
}

export async function updatePlant(id: string, data: UpdatePlantDto) {
  const plant = await getPlantById(id);

  const updatedPlant = await client.plant.update({
    where: { id },
    data,
  });
  return updatedPlant;
}

export async function deletePlant(id: string) {
  await getPlantById(id);
  await client.plant.delete({ where: { id } });
}