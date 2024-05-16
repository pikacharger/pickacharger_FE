import { ButtonHTMLAttributes } from "react";
import * as S from "./StickyButton.style";

export interface StickyButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  position?: "default" | "write";
}

export default function StickButton({
  text,
  disabled = false,
  position = "default",
  ...rest
}: StickyButtonProps) {
  return (
    <>
      <S.Container disabled={disabled} $position={position} {...rest}>
        <S.BtnText disabled={disabled}>{text}</S.BtnText>
      </S.Container>
    </>
  );
}
