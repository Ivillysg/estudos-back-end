type ProfileDataProps = {
  name: string;
  age: number;
  gitHub?: string | null;
};

export interface ProfileEntity {
  id?: string;
  userId: string;
  profileData: ProfileDataProps;
}
