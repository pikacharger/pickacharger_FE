import * as S from "./EmailLoading.style";
import loading from "@/assets/imgs/loading.gif";

export default function EmailLoading() {
  return (
    <S.Container>
      <S.ImgWrapper>
        <img
          style={{
            width: "100%",
          }}
          src={loading}
          alt="로딩 아이콘"
        />
      </S.ImgWrapper>
    </S.Container>
  );
}
