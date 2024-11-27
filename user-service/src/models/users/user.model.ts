import { db } from "@/db";
import type { CreateUserParams, User } from "./user.types";

export class UserModel {
  async findUserByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = $1";

    const result = await db.query(query, [email]);

    return result.rows[0] || null;
  }

  async create(params: CreateUserParams): Promise<User> {
    const { email, passwordHash } = params;
    const query =
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email";

    const result = await db.query(query, [email, passwordHash]);

    return result.rows[0];
  }
}
