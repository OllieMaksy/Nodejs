import client from "../prisma";
import { CreateUserDto } from "../schemas/users.schemas";

export async function getAllUsers(){
  const users = await client.user.findMany();
  return users;
}

export async function getUserById(id: string){
  const user = await client.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function createUser(data: CreateUserDto) {
  const emailExists = await client.user.findUnique({ where: { email: data.email } });
  if (emailExists) {
    throw new Error("Email must be unique");
  }

  const newUser = await client.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash: "",
      role: "USER",
    },
  });
}

export async function updateAvatar(id: string, avatarUrl: string | null) {
  return client.user.update({
    where: { id },
    data: { avatarUrl },
  });
}