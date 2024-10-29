import { ProfileEntity } from "@/entities/profile";

export interface ProfilesRepository {
  findById(id: string): Promise<ProfileEntity | null>;
  findByUserId(userId: string): Promise<ProfileEntity | null>;
  create(data: ProfileEntity): Promise<Partial<ProfileEntity>>;
}
