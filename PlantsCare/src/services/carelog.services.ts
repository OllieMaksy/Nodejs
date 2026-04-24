import client from "../prisma";
import { CreateCareLogDto, CreateReminderDto } from "../schemas/carelog.schemas";

// перевіряємо що userPlant належить цьому юзеру
async function checkOwnership(userPlantId: string, userId: string) {
  const userPlant = await client.userPlant.findFirst({
    where: { id: userPlantId, userId },
  });
  if (!userPlant) throw new Error("Plant not found in your collection");
  return userPlant;
}

// фіксує полив і автоматично оновлює lastWater
export async function waterPlant(userPlantId: string, userId: string) {
  await checkOwnership(userPlantId, userId);

  const now = new Date();

  const [updatedPlant, careLog] = await Promise.all([
    client.userPlant.update({
      where: { id: userPlantId },
      data: { lastWater: now },
    }),
    client.careLog.create({
      data: {
        userPlantId,
        type: "watering",
        notes: "Полито",
      },
    }),
  ]);

  return { updatedPlant, careLog };
}

export async function getCareLogs(userPlantId: string, userId: string) {
  await checkOwnership(userPlantId, userId);

  return await client.careLog.findMany({
    where: { userPlantId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createCareLog(
  userPlantId: string,
  userId: string,
  data: CreateCareLogDto
) {
  await checkOwnership(userPlantId, userId);

  return await client.careLog.create({
    data: {
      userPlantId,
      type: data.type,
      notes: data.notes,
    },
  });
}

export async function createReminder(
  userPlantId: string,
  userId: string,
  data: CreateReminderDto
) {
  await checkOwnership(userPlantId, userId);

  return await client.reminder.create({
    data: {
      userPlantId,
      type: data.type,
      remindAt: new Date(data.remindAt),
    },
  });
}

export async function getReminders(userPlantId: string, userId: string) {
  await checkOwnership(userPlantId, userId);

  return await client.reminder.findMany({
    where: { userPlantId },
    orderBy: { remindAt: "asc" },
  });
}

export async function getTodayReminders(userId: string) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return await client.reminder.findMany({
    where: {
      userPlant: { userId }, 
      remindAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
      done: false,
    },
    include: {
      userPlant: {
        select: {
          nickname: true,
          plant: { select: { name: true } },
        },
      },
    },
    orderBy: { remindAt: "asc" },
  });
}