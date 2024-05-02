/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as S from "./UserInfoForm.style";

import { useState, MouseEvent, Dispatch, SetStateAction } from "react";

import EmailVerificationInput from "@/components/pages/signup/emailVerificationInput/EmailVerificationInput ";
import LabelInput from "@/components/common/labelInput/LabelInput";
import Button from "@/components/common/button/Button";
import SelectCharger from "@/components/common/selectCharger/SelectCharger";
import SignUpForm from "@/components/pages/signup/form/Form";

import userApi from "@/apis/user";
import { UserType } from "@/types";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useToast } from "@/hooks/useToast";
import { useSignUp } from "@/hooks/queries/user";

import MESSAGE from "@/constants/message";
interface UserInfoFormProps {
  onNext: () => void;
  setData: Dispatch<SetStateAction<UserType>>;
  data: UserType;
}

export default function UserInfoForm({
  onNext,
  setData,
  data,
}: UserInfoFormProps) {
  const [chargerType, setChargerType] = useState<string | null>(null);
  const [isNickNameVerified, setIsNickNameVerified] = useState(false);
  const initialState = {
    username: "",
    nickname: "",
  };
  const defaultData = {
    roleId: 1,
    address: null,
    phoneNumber: null,
    profileImage: null,
  };

  const { formState, handleInputChange, error } =
    useFormValidation(initialState);
  const { triggerToast } = useToast();
  // const { signUp } = useSignUp();

  const handleChangeCharger = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    setChargerType(value);
  };

  const isNameInvalid = !!error.name || !formState.username;
  const isFormValid =
    !Object.keys(error).length &&
    formState.username &&
    formState.nickname &&
    isNickNameVerified &&
    chargerType;

  const handleCheckNickName = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isNameInvalid) {
      // try {
      // await authApi.checkNickname({ nickname: formState.nickname });
      setIsNickNameVerified(true);
      console.log("닉네임 중복확인 검사 성공");
      // } catch (error) {
      //  에러 메세지에 따라
      // triggerToast(MESSAGE.SIGNUP.NICKNAME, "error");
      // }
    }
  };

  const handleUserInfoFormSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFormValid) {
      const { code, passwordCheck, ...rest } = data;
      const submitData = {
        ...rest,
        ...formState,
        ...defaultData,
        chargerType,
      };

      try {
        const response = await userApi.signup(submitData);
        console.log("회원가입데이터", { submitData });
        console.log(response, "회원가입 성공");
        onNext();
      } catch (error) {
        triggerToast(MESSAGE.ERROR.DEFAULT, "error");
        console.error(error);
      }
    }
  };

  return (
    <SignUpForm>
      <LabelInput
        name="username"
        label="이름"
        error={error.username}
        placeholder="이름은 변경할 수 없어요."
        onChange={handleInputChange("username")}
        value={formState.username}
      />
      <EmailVerificationInput
        name="nickname"
        label="닉네임"
        error={error.nickname}
        placeholder="닉네임은 이후 변경할 수 있어요."
        btnText={isNickNameVerified ? "사용 가능" : "중복 확인"}
        onChange={handleInputChange("nickname")}
        onClick={handleCheckNickName}
        value={formState.nickname}
        isVerified={isNickNameVerified}
      />
      <SelectCharger value={chargerType} label onChange={handleChangeCharger} />
      <S.ButtonWrapper>
        <Button
          type={"submit"}
          size="lg"
          category={isFormValid ? "normal" : "disable"}
          onClick={handleUserInfoFormSubmit}
        >
          회원가입 완료
        </Button>
      </S.ButtonWrapper>
    </SignUpForm>
  );
}
