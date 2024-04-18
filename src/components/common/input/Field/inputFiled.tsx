import * as S from "./inputField.style";
import { HTMLAttributes, ReactNode } from "react";

export interface InputFieldProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function InputField({ children }: InputFieldProps) {
  return <S.Container>{children}</S.Container>;
}
