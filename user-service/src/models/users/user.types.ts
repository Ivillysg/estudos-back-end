// src/types/User.ts
export interface User {
  id: string;
  email: string;
  password_hash: string;
}

export interface CreateUserParams {
  email: string;
  passwordHash: string;
}
