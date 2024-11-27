import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().default("6379"),

  PORT: z.string().default("3000"),
  JWT_SECRET: z.string(),

  TRANSACTION_SERVICE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
