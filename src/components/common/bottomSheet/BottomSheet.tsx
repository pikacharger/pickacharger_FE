import * as S from "./BottomSheet.style";

import Button from "../button/Button";

import { ReactNode } from "react";

export interface BottomSheetProps {
  children: ReactNode;
  close: () => void;
}

export default function BottomSheet({ children, close }: BottomSheetProps) {
  return (
    <S.Background>
      <S.Container>
        {children}
        <Button size="big" category="rounded" onClick={close}>
          닫기
        </Button>
      </S.Container>
    </S.Background>
  );
}
