import { UserEntity } from "@/entities/user";
import { UsersRepository } from "@/repositories/user-repository";
import { hash } from "bcrypt";

export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: UserEntity) {
    const { email, password } = data;

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new Error("E-mail already exists.");
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    return {
      user,
    };
  }
}
