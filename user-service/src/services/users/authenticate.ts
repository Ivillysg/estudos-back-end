import { UserEntity } from "@/entities/user";
import { UsersRepository } from "@/repositories/user-repository";
import { compare, hash } from "bcrypt";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  token: string;
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: AuthenticateServiceRequest) {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const doestPasswordMatches = compare(password, user.password);

    if (!doestPasswordMatches) {
      throw new Error("Invalid credentials.");
    }

    return {
      user,
    };
  }
}
