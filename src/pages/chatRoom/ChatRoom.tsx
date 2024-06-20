import { useQuery } from "@tanstack/react-query";
import myChatApi from "@/apis/chat";
import ChatMessageList from "@/components/pages/chatRoom/chatMessageList/ChatMessageList";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";
import ErrorPage from "../Error/ErrorPage";
interface IUser {
  id: number;
}

export default function ChatRoom() {
  // page url에서 채팅룸 id 값 가져오기
  const currentUrl = window.location.href;
  const parts = currentUrl.split("/");
  const idIndex = parts.indexOf("chat-list") + 1;
  const roomId = parts[idIndex];

  // 현재 로그인한 유저 id 값 가져오기
  const {
    user: { id },
  } = useCheckUserInfo();

  // 채팅방 정보 가져오기
  const {
    data: chatRoomInfo,
    isLoading: isLoadingInfo,
    isError: isErrorInfo,
  } = useQuery({
    queryKey: ["chatRoomInfo", roomId],
    queryFn: () => myChatApi.getChatRoomInfo(roomId),
  });
  // 이전 채팅 내용 가져오기
  const {
    data: initialMessages,
    isLoading: isLoadingMessages,
    isError: isErrorMessages,
  } = useQuery({
    queryKey: ["chatRoomMessages", roomId],
    queryFn: () => myChatApi.getChatRoomMessages(roomId),
  });
  if (isLoadingInfo || isLoadingMessages) {
    return <div>Loading...</div>;
  }
  if (isErrorInfo || isErrorMessages) {
    return <ErrorPage />;
  }

  // 가져온 채팅방 유저정보 안에 현재 로그인한 유저 id가 있는지 체크
  if (chatRoomInfo && chatRoomInfo.response) {
    const ids = chatRoomInfo.response.user;
    const exists = Boolean(ids.find((user: IUser) => user.id === id));
    if (!exists) {
      return <ErrorPage />;
    }
  }
  return (
    <ChatMessageList
      chatRoomId={roomId}
      chatRoomInfo={chatRoomInfo.response}
      initialMessages={initialMessages.response}
    />
  );
}
