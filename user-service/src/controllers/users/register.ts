import { PgUsersRepository } from "@/repositories/postgres/pg-users-repository";
import { CreateUser } from "@/services/users/create-user";
import { FastifyReply, FastifyRequest } from "fastify";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };

  try {
    const usersRepository = new PgUsersRepository();
    const createService = new CreateUser(usersRepository);

    const user = await createService.execute({
      email,
      password,
    });

    return reply.status(201).send(user);
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
