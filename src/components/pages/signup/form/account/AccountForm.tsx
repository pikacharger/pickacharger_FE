/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from "./AccountForm.style";

import {
  MouseEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";

import EmailVerificationInput from "@/components/pages/signup/emailVerificationInput/EmailVerificationInput ";
import LabelInput from "@/components/common/labelInput/LabelInput";
import Button from "@/components/common/button/Button";
import SignUpForm from "@/components/pages/signup/form/Form";

import MESSAGE from "@/constants/message";

import userApi from "@/apis/user";
import { useToast } from "@/hooks/useToast";
import { useSendMail, useCheckCode } from "@/hooks/queries/user";
import { useFormValidation } from "@/hooks/useFormValidation";
import { UserType } from "@/types";
import Loading from "@/components/common/loading/Loading";
interface AccountFormProps {
  setData: Dispatch<SetStateAction<UserType>>;
  onNext: () => void;
}

export default function AccountForm({ onNext, setData }: AccountFormProps) {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);

  const { sendMail, isPending, isError } = useSendMail();
  const { checkCode, isError: isCheckCodeError } = useCheckCode();
  const { triggerToast } = useToast();

  const initialState = {
    email: "",
    code: "",
    password: "",
    passwordCheck: "",
  };

  const { formState, handleInputChange, error } =
    useFormValidation(initialState);

  const isEmailInvalid = !!error.email || !formState.email;
  const isCodeInvalid = !!error.code || !formState.code || isTimeOver;
  const isFormValid =
    !Object.keys(error).length &&
    formState.password &&
    formState.passwordCheck &&
    isCodeVerified;

  const handleSendEmail = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isCodeVerified) return;
    if (!isEmailInvalid) {
      sendMail({ email: formState.email });
      if (!isError) {
        setIsCodeSent(true);
        setIsTimeOver(false);
      }
    }
  };

  const handleCheckCode = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isCodeVerified) return;
    if (!isCodeInvalid && !isTimeOver && !isPending && !isError) {
      try {
        const response = await userApi.checkAuthMail({
          email: formState.email,
          authNum: formState.code,
        });
        triggerToast(MESSAGE.SIGNUP.CODE_SUCCESS, "success");
        setIsCodeVerified(true);
        setIsCodeSent(false);
        setIsTimeOver(false);
      } catch (error) {
        return triggerToast(MESSAGE.SIGNUP.CODE, "error");
      }
    }
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      setData({ ...formState });
      onNext();
    }
  };

  useEffect(() => {
    if (isTimeOver) {
      triggerToast(MESSAGE.SIGNUP.TIMER, "error");
      setIsCodeSent(false);
    }
  }, [isTimeOver]);

  return (
    <SignUpForm onSubmit={handleSubmitForm}>
      <EmailVerificationInput
        name="email"
        label="이메일"
        btnText="인증 요청"
        value={formState.email}
        onChange={handleInputChange("email")}
        placeholder="example@pikacharger.store"
        error={error.email}
        inputDisabled={((isCodeSent && !isError) || isCodeVerified) && !isError}
        disabled={
          isEmailInvalid ||
          (isCodeSent && !isTimeOver && !isError) ||
          (isCodeVerified && !isError)
        }
        isLoading={isPending}
        onClick={handleSendEmail}
      />
      <EmailVerificationInput
        name="code"
        setIsTimeOver={setIsTimeOver}
        label="이메일 인증"
        btnText={isCodeVerified ? "인증 완료" : "인증 확인"}
        value={formState.code}
        onChange={handleInputChange("code")}
        placeholder="인증코드를 입력해 주세요."
        error={error.code}
        disabled={
          (!isCodeSent ||
            isTimeOver ||
            isCodeVerified ||
            isPending ||
            isError) &&
          !isCheckCodeError
        }
        inputDisabled={
          (!isCodeSent ||
            isTimeOver ||
            isCodeVerified ||
            isPending ||
            isError) &&
          !isCheckCodeError
        }
        timer={isCodeSent && !isTimeOver && !isPending && !isError}
        onClick={handleCheckCode}
      />
      <LabelInput
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해 주세요."
        onChange={handleInputChange("password")}
        value={formState.password}
        error={error.password}
      />
      <LabelInput
        label="비밀번호 확인"
        type="password"
        name="passwordCheck"
        placeholder="비밀번호를 다시 한 번 입력해 주세요."
        onChange={handleInputChange("passwordCheck")}
        value={formState.passwordCheck}
        error={error.passwordCheck}
      />
      <S.ButtonWrapper>
        <Button
          type="submit"
          size="lg"
          category={isFormValid ? "normal" : "disable"}
        >
          다음
        </Button>
      </S.ButtonWrapper>
    </SignUpForm>
  );
}
