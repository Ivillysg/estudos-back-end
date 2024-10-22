import { db } from "@/database";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";

type CreateUserProfileRequest = {
  userId: string;
  name: string;
  age: number;
  githubUsername?: string;
};

type CreateUserProfileResponse = Partial<CreateUserProfileRequest>;

export async function createUserProfile(
  data: CreateUserProfileRequest
): Promise<CreateUserProfileResponse> {
  const { userId, name, age, githubUsername } = data;

  const query = `
  INSERT INTO profiles (user_id, profile_data)
  VALUES ($1, $2)
  RETURNING *`;

  const values = [userId, JSON.stringify({ name, age, githubUsername })];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}
