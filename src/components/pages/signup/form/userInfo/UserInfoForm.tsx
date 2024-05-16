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

export default function UserInfoForm({ onNext, data }: UserInfoFormProps) {
  const [chargerType, setChargerType] = useState<string | null>(null);
  const [isNickNameVerified, setIsNickNameVerified] = useState(false);
  const initialState = {
    username: "",
    nickname: "",
  };
  const defaultData = {
    address: "",
    phoneNumber: "",
  };

  const { formState, handleInputChange, error } =
    useFormValidation(initialState);

  const { triggerToast } = useToast();
  const { signUp } = useSignUp(onNext);

  const handleChangeCharger = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    setChargerType(value);
  };

  const isFormValid =
    !Object.keys(error).length &&
    formState.username &&
    formState.nickname &&
    isNickNameVerified &&
    chargerType;

  const isNickNameInvalid = !!error.nickname || !formState.nickname;

  const handleCheckNickName = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isNickNameInvalid) {
      try {
        const response = await userApi.checkUserNickName(formState.nickname);
        triggerToast(MESSAGE.SIGNUP.NICKNAME_SUCCESS, "success");
        if (response)
          return triggerToast(MESSAGE.SIGNUP.NICKNAME_FAIL, "error");
        setIsNickNameVerified(true);
      } catch (error) {
        triggerToast(MESSAGE.ERROR.DEFAULT, "error");
      }
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
      signUp(submitData);
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
        inputDisabled={isNickNameVerified}
        disabled={isNickNameVerified || isNickNameInvalid}
        value={formState.nickname}
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
