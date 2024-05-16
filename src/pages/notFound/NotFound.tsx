import * as S from "./NotFound.style";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/button/Button";
import BoltIcon from "@/components/common/icons/BoltIcon";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <S.Container>
      <BoltIcon width="50" height="50" color="#FDB022" />
      <S.TitleBox>
        <h2>페이지를 찾을 수 없어요.</h2>
        <p>페이지 주소를 다시 한번 확인해 주세요.</p>
      </S.TitleBox>

      <Button size="full" category="retry" onClick={handleGoBack}>
        돌아가기
      </Button>
    </S.Container>
  );
}
