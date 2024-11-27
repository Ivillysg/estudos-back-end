import { env } from "@/env";
import { Pool } from "pg";

export const db = new Pool({
  connectionString: env.DATABASE_URL,
});
