import { db } from "@/database";
import { PgUsersRepository } from "@/repositories/postgres/pg-users-repository";
import { AuthenticateService } from "@/services/users/authenticate";
import { compare } from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };

  try {
    const usersRepository = new PgUsersRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    const { user } = await authenticateService.execute({ email, password });

    const token = await reply.jwtSign(
      {
        id: user?.id,
        email: user.email,
      },
      {
        sign: {
          expiresIn: "1d",
        },
      }
    );

    return {
      token,
    };
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
