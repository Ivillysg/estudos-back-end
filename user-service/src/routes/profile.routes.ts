import { ProfileController } from "@/controllers/profile.controller";
import type { FastifyInstance } from "fastify";

export async function profileRoutes(app: FastifyInstance) {
  const profileController = new ProfileController();

  app.post(
    "/profiles",
    profileController.createProfile.bind(profileController)
  );
  app.get(
    "/profiles/:userId",
    profileController.getProfile.bind(profileController)
  );
  app.put("/profiles", profileController.updateProfile.bind(profileController));
}
