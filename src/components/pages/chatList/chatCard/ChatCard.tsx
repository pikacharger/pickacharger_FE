import { useNavigate } from "react-router-dom";
import * as S from "./ChatCard.style";
import DefaultProfile from "../defaultProfile/DefaultProfile";
import getDateFormat from "@/utils/getDateFormat";

export interface ChatCardProps {
  userImgUrl: string | null;
  userNickname: string;
  createdAt: string;
  roomId: number;
  text: string;
}

export default function ChatCard({
  userImgUrl,
  userNickname,
  roomId,
  createdAt,
  text,
}: ChatCardProps) {
  const navigate = useNavigate();
  return (
    <S.Card onClick={() => navigate(`/chat-list/${roomId}`)}>
      <S.ProfilePhotoBox>
        {!userImgUrl && <DefaultProfile size="lg" />}
        {userImgUrl && <S.Img src={userImgUrl} alt="프로필 사진" />}
      </S.ProfilePhotoBox>
      <S.Info>
        <div>
          <S.Name>{userNickname}</S.Name>
          <S.CreatedAt>{getDateFormat(createdAt)}</S.CreatedAt>
        </div>
        <S.Text>{text}</S.Text>
      </S.Info>
    </S.Card>
  );
}
