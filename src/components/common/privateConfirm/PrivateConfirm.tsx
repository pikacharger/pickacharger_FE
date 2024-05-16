import * as S from "./PrivateConfirm.style";

import Button from "../button/Button";

interface PrivateConfirmProps {
  cancelHandler: () => void;
  confirmHandler: () => void;
}

export default function PrivateConfirm({
  cancelHandler,
  confirmHandler,
}: PrivateConfirmProps) {
  return (
    <S.Background>
      <S.Container>
        <S.Title>
          <h3>로그인이 필요한 서비스입니다.</h3>
          <p>로그인 페이지로 이동할까요?</p>
        </S.Title>
        <S.BtnWrapper>
          <Button category="normal" size="md" onClick={confirmHandler}>
            확인
          </Button>
          <Button category="outline" size="md" onClick={cancelHandler}>
            취소
          </Button>
        </S.BtnWrapper>
      </S.Container>
    </S.Background>
  );
}
