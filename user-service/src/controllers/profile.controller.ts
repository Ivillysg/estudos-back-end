import { ProfileModel } from "@/models/profile/profile.model";
import { ProfileService } from "@/services/profile/profile.service";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export class ProfileController {
  private profileService: ProfileService;

  constructor() {
    const profileModel = new ProfileModel();
    this.profileService = new ProfileService(profileModel);
  }

  async createProfile(request: FastifyRequest, reply: FastifyReply) {
    const createProfileSchema = z.object({
      userId: z.number(),
      data: z.record(z.any()),
    });

    try {
      const { userId, data } = createProfileSchema.parse(request.body);
      const profile = await this.profileService.createProfile(userId, data);
      return reply.status(201).send({ profile });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }

  async getProfile(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      userId: z.coerce.number(),
    });

    try {
      const { userId } = paramsSchema.parse(request.params);
      const profile = await this.profileService.getProfileByUserId(userId);

      if (!profile) {
        return reply.status(404).send({ error: "Perfil não encontrado." });
      }

      return reply.status(200).send({ profile });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }

  async updateProfile(request: FastifyRequest, reply: FastifyReply) {
    const updateProfileSchema = z.object({
      userId: z.number(),
      data: z.record(z.any()),
    });

    try {
      const { userId, data } = updateProfileSchema.parse(request.body);
      const profile = await this.profileService.updateProfile(userId, data);

      return reply.status(200).send({ profile });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }
}
