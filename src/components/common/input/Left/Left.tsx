import * as S from "./Left.style";
import { ReactNode } from "react";

export interface InputLeftProps {
  children: ReactNode;
  disabled?: boolean;
}

export default function InputLeft({ children, disabled }: InputLeftProps) {
  return <S.Container disabled={disabled}>{children}</S.Container>;
}
