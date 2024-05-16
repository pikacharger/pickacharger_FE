import { atom } from "jotai";
import { UserInfoResponse } from "@/types";

export const userAtom = atom<UserInfoResponse>({
  id: null,
  username: "",
  email: "",
  nickName: "",
  chargerType: null,
  address: "",
  phoneNumber: "",
  profileImage: "",
});
