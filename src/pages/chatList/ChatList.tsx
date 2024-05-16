import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import * as S from "./ChatList.style";
import { useQuery } from "@tanstack/react-query";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";
import myChatApi from "@/apis/chat";
import ChatCard from "@/components/pages/chatList/chatCard/ChatCard";
export interface IMyChatRoom {
  createDate: string;
  nickname: string;
  chatRoomId: number;
  userImgUrl: string | null;
  lastMessage: string;
}

export default function ChatList() {
  const { user } = useCheckUserInfo();
  const { data } = useQuery({
    queryKey: ["myChatRoomList", user.id],
    queryFn: myChatApi.getChatRoomList,
  });

  return (
    <S.Container>
      <TopNavigationBar text="나의 채팅" />
      <S.List>
        {data ? (
          data.response.map((room: IMyChatRoom) => {
            return (
              <ChatCard
                key={room.chatRoomId}
                roomId={room.chatRoomId}
                userImgUrl={room.userImgUrl}
                userNickname={room.nickname}
                createdAt={room.createDate}
                text={room.lastMessage}
              />
            );
          })
        ) : (
          <S.EmptyText>
            <p>충전소에 궁금한 점이 있나요?</p>
            <span>문의하기 버튼을 눌러 충전소에 직접 질문해보세요.</span>
          </S.EmptyText>
        )}
      </S.List>
    </S.Container>
  );
}
