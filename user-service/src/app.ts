import fastify from "fastify";

import fastifyJwt from "@fastify/jwt";

import { usersRoutes } from "./controllers/users/routes";

export const app = fastify({});

app.register(fastifyJwt, {
  secret: "12345",
});

app.register(usersRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof Error) {
    return reply.status(400).send({ message: "Validation error." });
  }

  return reply.status(500).send({ message: "Internal server error." });
});
