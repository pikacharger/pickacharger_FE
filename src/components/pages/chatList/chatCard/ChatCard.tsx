import { useNavigate } from "react-router-dom";
import * as S from "./ChatCard.style";
import DefaultProfile from "../defaultProfile/DefaultProfile";
import getDateFormat from "@/utils/getDateFormat";
import { ChatUser } from "@/pages/chatList/ChatList";

export interface ChatCardProps {
  chatRoomId: number;
  createDate: string;
  lastMessage: string;
  users: ChatUser[];
  loginUserId: number;
}

export default function ChatCard({
  users,
  chatRoomId,
  createDate,
  lastMessage,
  loginUserId,
}: ChatCardProps) {
  const navigate = useNavigate();
  const otherUser = users.find(
    (chatUser: ChatUser) => chatUser.userId !== loginUserId
  )!;
  return (
    <S.Card onClick={() => navigate(`/chat-list/${chatRoomId}`)}>
      <S.ProfilePhotoBox>
        {!otherUser.userProfileImg && <DefaultProfile size="lg" />}
        {otherUser.userProfileImg && (
          <S.Img src={otherUser.userProfileImg} alt="프로필 사진" />
        )}
      </S.ProfilePhotoBox>
      <S.Info>
        <div>
          <S.Name>{otherUser.userNickname}</S.Name>
          <S.CreatedAt>{getDateFormat(createDate)}</S.CreatedAt>
        </div>
        <S.Text>{lastMessage}</S.Text>
      </S.Info>
    </S.Card>
  );
}
