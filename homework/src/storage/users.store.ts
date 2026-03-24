export type User = {
    id: string;
    name: string;
    email: string;
  };
  
  export const usersStore = new Map<string, User>();