import { usersStore, User } from "../storage/users.store";
import { CreateUserDto } from "../schemas/users.schemas";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function getAllUsers(): User[] {
  return Array.from(usersStore.values());
}

export function getUserById(id: string): User {
  const user = usersStore.get(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export function createUser(data: CreateUserDto): User {
  const emailExists = Array.from(usersStore.values()).some(
    (user) => user.email === data.email
  );

  if (emailExists) {
    throw new Error("Email must be unique");
  }

  const newUser: User = {
    id: generateId(),
    ...data,
  };

  usersStore.set(newUser.id, newUser);
  return newUser;
}