import * as S from "./Left.style";
import { ReactNode } from "react";

export interface InputLeftProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export default function InputLeft({
  children,
  disabled,
  onClick,
}: InputLeftProps) {
  return (
    <S.Container onClick={onClick} disabled={disabled}>
      {children}
    </S.Container>
  );
}
