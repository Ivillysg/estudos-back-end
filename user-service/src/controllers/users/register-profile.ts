import { db } from "@/database";
import { ProfileEntity } from "@/entities/profile";
import { PgProfilesRepository } from "@/repositories/postgres/pg-profiles-repository";
import { CreateUserProfileService } from "@/services/users/create-user-profile";
import { FastifyReply, FastifyRequest } from "fastify";

export async function registerProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = request.user;

  const { name, age, gitHub } = request.body as {
    name: string;
    age: number;
    gitHub?: string;
  };

  try {
    const profilesRepository = new PgProfilesRepository();
    const createUserProfileService = new CreateUserProfileService(
      profilesRepository
    );

    const profile = await createUserProfileService.execute({
      userId: user.id,
      profileData: {
        name,
        age,
        gitHub: gitHub ? gitHub : null,
      },
    });

    return reply.status(201).send(profile);
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
