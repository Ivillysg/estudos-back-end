import { db } from "@/db";

export class ProfileModel {
  async createProfile({
    userId,
    data,
  }: {
    userId: string;
    data: Record<string, unknown>;
  }) {
    const query = `
      INSERT INTO profiles (user_id, data)
      VALUES ($1, $2)
      RETURNING id, user_id, data;
    `;
    const result = await db.query(query, [userId, data]);
    return result.rows[0];
  }

  async getProfileByUserId(userId: string) {
    const query = "SELECT * FROM profiles WHERE user_id = $1";
    const result = await db.query(query, [userId]);
    return result.rows[0];
  }

  async updateProfile(userId: number, data: Record<string, unknown>) {
    const query = `
      UPDATE profiles
      SET data = $2, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
      RETURNING id, user_id, data;
    `;
    const result = await db.query(query, [userId, data]);
    return result.rows[0];
  }
}
