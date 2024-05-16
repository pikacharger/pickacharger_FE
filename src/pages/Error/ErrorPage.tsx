import * as S from "./ErrorPage.style";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/button/Button";
import BoltIcon from "@/components/common/icons/BoltIcon";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <S.Container>
      <BoltIcon width="50" height="50" color="#FDB022" />
      <S.TitleBox>
        <h2>문제가 발생했어요!</h2>
        <p>관리자에게 문의해 주세요.</p>
      </S.TitleBox>

      <Button size="full" category="retry" onClick={handleGoBack}>
        돌아가기
      </Button>
    </S.Container>
  );
}
