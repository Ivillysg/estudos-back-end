import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { register } from "./register";
import { verifyJwt } from "@/middlewares/verify-user-authenticate";
import { profile } from "./profile";
import { registerProfile } from "./register-profile";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJwt] }, profile);
  app.post("/profile", { onRequest: [verifyJwt] }, registerProfile);
}
