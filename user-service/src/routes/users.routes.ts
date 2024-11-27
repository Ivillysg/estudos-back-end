import { UserController } from "@/controllers/users.controller";
import type { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
  const { redis } = app;

  // Verifica se Redis está acessível
  if (!redis) {
    throw new Error("Redis não está configurado corretamente.");
  }

  const userController = new UserController(redis);

  //O método bind fixa o contexto da classe ao método, garantindo que o this seja a instância do controlador, mesmo quando o método é chamado fora do seu escopo original.
  app.post("/users/create", userController.register.bind(userController));
  app.post("/sign-in", userController.signIn.bind(userController));
}
