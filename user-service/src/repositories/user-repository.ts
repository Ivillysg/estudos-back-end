import { UserEntity } from "@/entities/user";

export interface UsersRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(data: UserEntity): Promise<Partial<UserEntity>>;
}
