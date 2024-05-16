/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from "./EmailVerificationInput.style";

import { MouseEvent, ChangeEvent, Dispatch, SetStateAction } from "react";

import Input from "@/components/common/input/input";
import ErrorMessage from "@/components/common/errorMessage/ErrorMessage";
import Button from "@/components/common/button/Button";
import Timer from "../timer/Timer";
import { ColorType } from "@/types";
import EmailLoading from "./emailLoading/EmailLoading";

interface EmailVerificationInputProps {
  isLoading?: boolean;
  isVerified?: boolean;
  inputDisabled?: boolean;
  error?: string;
  label: string;
  placeholder?: string;
  btnText: string;
  timer?: boolean;
  disabled?: boolean;
  value?: string;
  name: string;
  setIsTimeOver?: Dispatch<SetStateAction<boolean>>;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  color?: ColorType;
}

const TIMERMINUTES = 3;

export default function EmailVerificationInput({
  isLoading = false,
  isVerified = false,
  disabled = false,
  label,
  error,
  name,
  btnText,
  timer,
  value,
  placeholder,
  inputDisabled = false,
  onClick,
  onChange,
  setIsTimeOver,
}: EmailVerificationInputProps) {
  return (
    <Input>
      <Input.Label htmlFor={name}>{label}</Input.Label>
      <S.Box>
        <Input.Base size="md" disabled={inputDisabled}>
          <Input.Center
            disabled={inputDisabled}
            color="default"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
          {timer && (
            <Input.Right>
              <Timer minutes={TIMERMINUTES} setIsTimeOver={setIsTimeOver} />
            </Input.Right>
          )}
          {isLoading && (
            <Input.Right>
              <EmailLoading />
            </Input.Right>
          )}
        </Input.Base>
        <Button
          size="sm"
          disabled={isVerified || disabled}
          category={isVerified ? "retry" : disabled ? "disable" : "normal"}
          onClick={onClick}
        >
          {btnText}
        </Button>
      </S.Box>
      <ErrorMessage visible={!!error}>{error}</ErrorMessage>
    </Input>
  );
}
