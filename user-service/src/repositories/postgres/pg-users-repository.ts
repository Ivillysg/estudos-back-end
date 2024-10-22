import { UserEntity } from "@/entities/user";
import { UsersRepository } from "../user-repository";
import { db } from "@/database";

export class PgUsersRepository implements UsersRepository {
  findById(id: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    const query = /* sql */ `SELECT * FROM users WHERE email = $1`;
    const values = [email];

    const result = await db.query(query, values);

    if (result.rows[0]) {
      return {
        ...result.rows[0],
      };
    }
    return null;
  }
  async create(data: UserEntity): Promise<Partial<UserEntity>> {
    const { email, password } = data;

    const query = /* sql */ `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`;

    const values = [email, password];

    const result = await db.query<UserEntity>(query, values);
    const user = result.rows[0];

    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };
  }
}
