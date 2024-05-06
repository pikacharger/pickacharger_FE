export interface UserType {
  email: string;
  code: string;
  passwordCheck: string;
  password: string;
  username?: string;
  nickname?: string;
  charger?: string;
}

export interface UserInfoRequest {
  username: string;
  email: string;
  nickname: string;
  chargerType: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  profileImage?: string | null;
}

export interface UserInfoResponse {
  roleId: number;
  id: number | null;
  username: string;
  email: string;
  nickname: string;
  chargerType: string | null;
  address?: string;
  phoneNumber?: string;
  profileImage?: string;
}
