import { useNavigate } from "react-router-dom";
import * as S from "./ChargerInfoBar.style";

export interface ChargerInfoBarProps {
  id: string;
  image: string | null;
  name: string;
  address: string;
}

export default function ChargerInfoBar({
  id,
  image,
  name,
  address,
}: ChargerInfoBarProps) {
  const navigate = useNavigate();
  return (
    <S.Bar onClick={() => navigate(`/charger/detail/${id}`)}>
      <S.ImgBox>{image && <S.Img src={image} alt="충전기 사진" />}</S.ImgBox>
      <S.TextBox>
        <S.Name>{name}</S.Name>
        <S.Address>{address}</S.Address>
      </S.TextBox>
    </S.Bar>
  );
}
