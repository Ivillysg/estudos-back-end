import type { ProfileModel } from "@/models/profile/profile.model";

export class ProfileService {
  constructor(private profileModel: ProfileModel) {}

  async createProfile(userId: number, data: Record<string, unknown>) {
    return await this.profileModel.createProfile(userId, data);
  }

  async getProfileByUserId(userId: number) {
    return await this.profileModel.getProfileByUserId(userId);
  }

  async updateProfile(userId: number, data: Record<string, unknown>) {
    return await this.profileModel.updateProfile(userId, data);
  }
}
