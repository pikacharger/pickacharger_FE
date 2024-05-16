import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import userApi from "@/apis/user";
import TokenService from "@/utils/tokenService";
import MESSAGE from "@/constants/message";
import { useToast } from "../useToast";
import { UserInfoRequest } from "@/types";
import { setCookie } from "@/utils/cookie";

const useLogin = () => {
  const navigate = useNavigate();
  const { triggerToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      userApi.login(data),
    onSuccess: (res) => {
      TokenService.setToken(res.token);
      setCookie("refreshToken", res.refreshToken, 7);
      triggerToast(MESSAGE.LOGIN.SUCCESS, "success");
      navigate("/");
    },
    onError: (error: AxiosError<string>) => {
      if (error.response?.data) {
        triggerToast(MESSAGE.ERROR.DEFAULT, "error");
      }
    },
  });

  return {
    login: mutate,
  };
};

const useSignUp = (func: () => void) => {
  const { triggerToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (data: UserInfoRequest) => userApi.signup(data),
    onSuccess: () => {
      func();
    },
    onError: (error: AxiosError<string>) => {
      if (error.response?.data) {
        triggerToast(MESSAGE.ERROR.DEFAULT, "error");
      }
    },
  });

  return {
    signUp: mutate,
  };
};

const useGetUserInfo = () => {
  const token = TokenService.getToken();
  const { data, ...rest } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: () => {
      return userApi.getUserInfo();
    },
    enabled: !!token,
  });
  return { data, ...rest };
};

const useSendMail = () => {
  const { triggerToast } = useToast();
  const { mutate, ...rest } = useMutation({
    mutationFn: (data: { email: string }) => userApi.sendMail(data),
    onSuccess: () => {},
    onError: (error: AxiosError) => {
      if (error.response?.status == 400) {
        return triggerToast(MESSAGE.SIGNUP.EMAIL, "error");
      } else {
        return triggerToast(MESSAGE.ERROR.DEFAULT, "error");
      }
    },
  });

  return {
    sendMail: mutate,
    ...rest,
  };
};

const useCheckCode = () => {
  const { triggerToast } = useToast();
  const { mutate, ...rest } = useMutation({
    mutationFn: (data: { email: string; authNum: string }) =>
      userApi.checkAuthMail(data),
    onSuccess: () => {},
    onError: (error: AxiosError) => {
      if (error) {
        return triggerToast(MESSAGE.SIGNUP.CODE, "error");
      }
    },
  });

  return {
    checkCode: mutate,
    ...rest,
  };
};

export { useSignUp, useLogin, useGetUserInfo, useSendMail, useCheckCode };
