/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useAtom } from "jotai";

import { userAtom } from "@/atoms/userAtom";
import { useGetUserInfo } from "@/hooks/queries/user";

const useCheckUserInfo = () => {
  const [user, setUser] = useAtom(userAtom);

  const { data } = useGetUserInfo();
  useEffect(() => {
    if (data) {
      const {
        id,
        nickName,
        username,
        email,
        chargerType,
        address,
        phoneNumber,
        profileImage,
      } = data;
      setUser({
        id,
        nickName,
        username,
        email,
        chargerType,
        address,
        phoneNumber,
        profileImage,
      });
    }
  }, [data]);

  return { user, setUser };
};

export default useCheckUserInfo;
