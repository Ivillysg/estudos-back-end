import { env } from "@/env";
import type { UserModel } from "@/models/users/user.model";
import { compare, hash } from "bcrypt";
import type { RegisterUserParams } from "./user.types";
import type { ProfileModel } from "@/models/profile/profile.model";
import { db } from "@/db";

export class UserService {
  constructor(
    private userModel: UserModel,
    private profileModel: ProfileModel
  ) {}

  async registerUser({ email, password, profile }: RegisterUserParams) {
    const client = await db.connect(); // Obtém um cliente para gerenciar a transação

    const hasUser = await this.userModel.findUserByEmail(email);

    if (hasUser) {
      throw new Error("E-mail já cadastrado");
    }
    const passwordHash = await hash(password, Number(env.SALTS_ROUNDS));

    const user = await this.userModel.create({
      email,
      passwordHash,
    });

    const userProfile = await this.profileModel.createProfile({
      userId: user.id,
      data: profile,
    });

    return {
      ...user,
      ...userProfile,
    };
  }

  async signIn(data: RegisterUserParams) {
    const { email, password } = data;

    const user = await this.userModel.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const doestPasswordMatches = await compare(password, user.password_hash);

    if (!doestPasswordMatches) {
      throw new Error("Invalid credentials.");
    }

    return {
      user,
    };
  }
}
