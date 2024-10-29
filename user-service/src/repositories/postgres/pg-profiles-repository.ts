import { UserEntity } from "@/entities/user";
import { UsersRepository } from "../user-repository";
import { db } from "@/database";
import { ProfilesRepository } from "../profile-repository";
import { ProfileEntity } from "@/entities/profile";

export class PgProfilesRepository implements ProfilesRepository {
  findById(id: string): Promise<ProfileEntity | null> {
    throw new Error("Method not implemented.");
  }
  async findByUserId(userId: string): Promise<ProfileEntity | null> {
    const query = /* sql */ `SELECT * FROM profiles WHERE user_id = $1`;
    const values = [userId];

    const result = await db.query(query, values);

    if (result.rows[0]) {
      return {
        ...result.rows[0],
      };
    }
    return null;
  }
  async create(data: ProfileEntity): Promise<Partial<ProfileEntity>> {
    const { userId, profileData } = data;

    const query = /* sql */ `INSERT INTO profiles (user_id, profile_data) VALUES ($1, $2) RETURNING *`;

    const values = [userId, JSON.stringify(profileData)];

    const result = await db.query<ProfileEntity>(query, values);

    return {
      ...result.rows[0],
    };
  }
}
