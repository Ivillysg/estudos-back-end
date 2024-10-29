import { ProfileEntity } from "@/entities/profile";
import { UserEntity } from "@/entities/user";
import { ProfilesRepository } from "@/repositories/profile-repository";
import { hash } from "bcrypt";

type CreateUserProfileRequest = {
  userId: string;
  name: string;
  age: number;
  githubUsername?: string;
};

type CreateUserProfileResponse = Partial<CreateUserProfileRequest>;

export class CreateUserProfileService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute(data: ProfileEntity) {
    const { userId, profileData } = data;
    //Check if exists user profile
    const userProfile = await this.profilesRepository.findByUserId(userId);

    if (userProfile) {
      throw new Error("User profile exists");
    }

    const result = await this.profilesRepository.create({
      userId,
      profileData,
    });

    return {
      result,
    };
  }
}
