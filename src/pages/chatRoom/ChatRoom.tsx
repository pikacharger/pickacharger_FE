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
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chatRoomInfo", roomId],
    queryFn: () => myChatApi.getChatRoomInfo(roomId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
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
  const {
    response: { chargerId, chargerImg, chargerName, chargingSpeed, createDate },
  } = chatRoomInfo;
  return (
    <ChatMessageList
      userId={id}
      chatRoomId={roomId}
      chargerId={chargerId}
      chargerImg={chargerImg}
      chargerName={chargerName}
      chargingSpeed={chargingSpeed}
      createDate={createDate}
    />
  );
}
