import { ProfileModel } from "@/models/profile/profile.model";
import { UserModel } from "@/models/users/user.model";
import { UserService } from "@/services/user/user.service";
import type { FastifyRedis } from "@fastify/redis";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export class UserController {
  private userModel: UserModel;
  private profileModel: ProfileModel;
  private userService: UserService;

  constructor(private redisClient: FastifyRedis) {
    if (!redisClient) {
      throw new Error("Redis client não foi configurado corretamente.");
    }
    this.userModel = new UserModel();
    this.profileModel = new ProfileModel();
    this.userService = new UserService(this.userModel, this.profileModel);
  }

  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Define o schema de validação para o registro de usuário
    const registerUserSchema = z.object({
      email: z.string().email("Email inválido."),
      password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
      profile: z.record(z.any()),
    });

    try {
      // Valida a entrada
      const { email, password, profile } = registerUserSchema.parse(
        request.body
      );

      // Registra o usuário
      const result = await this.userService.registerUser({
        email,
        password,
        profile,
      });

      // Retorna a resposta de sucesso
      reply.status(201).send({ result });
    } catch (error: any) {
      // Retorna erro de validação ou operacional
      reply.status(error.statusCode || 400).send({ error: error.message });
    }
  }

  async signIn(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Define o schema de validação para o login de usuário
    const signInUserSchema = z.object({
      email: z.string().email("Email inválido."),
      password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    });

    try {
      // Valida a entrada
      const { email, password } = signInUserSchema.parse(request.body);

      // Realiza o login
      const { user } = await this.userService.signIn({ email, password });

      if (!user) {
        return reply.status(401).send({ error: "Credenciais inválidas." });
      }

      // Gera o token JWT
      const token = await reply.jwtSign(
        { id: user.id, email: user.email },
        { sign: { expiresIn: "1d" } }
      );

      // Armazena o usuário no Redis
      await this.redisClient.set(
        `user:${user.id}`,
        JSON.stringify(user),
        "EX",
        3600 // Expira em 1 hora
      );

      // Retorna o token ao cliente
      reply.status(200).send({ token });
    } catch (error: any) {
      // Retorna erro de validação ou operacional
      reply.status(error.statusCode || 500).send({ error: error.message });
    }
  }
}
