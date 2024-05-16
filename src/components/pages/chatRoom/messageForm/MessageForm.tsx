import React from "react";
import * as S from "./MessageForm.style";
export interface MessageFormProps {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (text: string) => void;
}

export default function MessageForm({
  text,
  onChange,
  onSubmit,
}: MessageFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    onSubmit(text);
  };
  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Input
        type="text"
        placeholder="메시지 보내기"
        value={text}
        onChange={onChange}
      />
      <S.SubmitButton>
        <S.Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19 16"
          fill="none"
        >
          <path d="M0 16V10L8 8L0 6V0L19 8L0 16Z" fill="#d9d9d9" />
        </S.Svg>
      </S.SubmitButton>
    </S.Form>
  );
}
