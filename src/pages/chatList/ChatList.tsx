import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import * as S from "./ChatList.style";
import { useQuery } from "@tanstack/react-query";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";
import myChatApi from "@/apis/chat";
import ChatCard from "@/components/pages/chatList/chatCard/ChatCard";

export interface ChatUser {
  userId: number;
  userNickname: string;
  userProfileImg: string | null;
}
export interface MyChatRoom {
  chatRoomId: number;
  createDate: string;
  lastMessage: string;
  users: ChatUser[];
}

export default function ChatList() {
  const { user } = useCheckUserInfo();
  const { data } = useQuery({
    queryKey: ["chatRoomList", user.id],
    queryFn: myChatApi.getChatRoomList,
  });
  return (
    <S.Container>
      <TopNavigationBar text="나의 채팅" />
      <S.List>
        {data ? (
          data.response
            .sort((a: MyChatRoom, b: MyChatRoom) => b.chatRoomId - a.chatRoomId)
            .map((room: MyChatRoom) => {
              return (
                <ChatCard
                  key={room.chatRoomId}
                  chatRoomId={room.chatRoomId}
                  users={room.users}
                  createDate={room.createDate}
                  lastMessage={room.lastMessage}
                  loginUserId={user.id!}
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
