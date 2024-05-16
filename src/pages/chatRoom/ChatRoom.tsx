import IconButton from "@/components/common/iconButton/IconButton";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import ChargerInfoBar from "@/components/pages/chatRoom/chargerInfoBar/ChargerInfoBar";
import ChatBottomSheet from "@/components/pages/chatRoom/chatBottomSheet/ChatBottomSheet";
import { useToggle } from "@/hooks/useToggle";
import React, { useEffect, useRef, useState } from "react";
import * as S from "./ChatRoom.style";
import MessageForm from "@/components/pages/chatRoom/messageForm/MessageForm";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import getDateFormat from "@/utils/getDateFormat";
import myChatApi from "@/apis/chat";
export interface IUser {
  name: string;
  profileImg: string;
}
export interface IMessage {
  text: string;
  createdAt: string;
  user: IUser;
}
export interface IMessageProps {
  messageContents: string;
}

export default function ChatRoom() {
  const currentUrl = window.location.href;
  const parts = currentUrl.split("/");
  const idIndex = parts.indexOf("chat-list") + 1;
  const roomId = parts[idIndex];
  const { data } = useQuery({
    queryKey: ["chatRoomMessages", roomId],
    queryFn: () => myChatApi.getChatRoomMessages(roomId),
  });
  const navigate = useNavigate();
  const { open, close, isOpen } = useToggle(false);
  const [text, setText] = useState("");
  // const [messages, setMessages] = useState<IMessage[]>([]);
  const chatRoomRef = useRef<HTMLDivElement>(null);
  // const { isConnected } = useWebSocket();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setText(value);
  };
  console.log(data);
  const onSubmit = (text: string) => {
    const roomId = data.response[0].chargerId;
    console.log(roomId);
    myChatApi
      .postChatRoomMessage(roomId, { messageContents: text })
      .then((res) => console.log(res));
  };

  // 채팅방 입장하면 스크롤 최하단으로 이동
  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, []);

  return (
    <S.Container>
      <TopNavigationBar
        leftBtn={
          <IconButton icon="arrowLeft" onClick={() => navigate("/chat-list")} />
        }
        text={"user nickname"}
        rightBtn={<IconButton icon="more" onClick={open} />}
      />
      <ChargerInfoBar
        id={data && data.response[0].chargerId}
        image={data && data.response[0].chargerImg}
        name={data && data.response[0].chargerName}
        address={data && data.response[0].chargerLocation}
      />
      <S.List ref={chatRoomRef}>
        <S.CreatedAt>
          {data && getDateFormat(data.response[0].createDate)}
        </S.CreatedAt>
        <S.CreatedAt>아직 대화가 없습니다.</S.CreatedAt>
      </S.List>
      <MessageForm text={text} onChange={onChange} onSubmit={onSubmit} />
      {isOpen && <ChatBottomSheet close={close} open={isOpen} />}
    </S.Container>
  );
}
