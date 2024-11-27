import fastify from "fastify";
import fastifyRedis from "@fastify/redis";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { userRoutes } from "./routes/users.routes";
import { profileRoutes } from "./routes/profile.routes";

export const app = fastify({});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyRedis, {
  host: 'localhost',
  port: Number(env.REDIS_PORT),
});

app.register(userRoutes);
app.register(profileRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof Error) {
    return reply.status(400).send({ message: "Validation error." });
  }

  return reply.status(500).send({ message: "Internal server error." });
});
