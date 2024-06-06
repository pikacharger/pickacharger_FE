import IconButton from "@/components/common/iconButton/IconButton";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import ChargerInfoBar from "@/components/pages/chatRoom/chargerInfoBar/ChargerInfoBar";
import ChatBottomSheet from "@/components/pages/chatRoom/chatBottomSheet/ChatBottomSheet";
import { useToggle } from "@/hooks/useToggle";
import React, { useEffect, useRef, useState } from "react";
import MessageForm from "@/components/pages/chatRoom/messageForm/MessageForm";
import { useNavigate } from "react-router-dom";
import getDateFormat from "@/utils/getDateFormat";
import * as S from "./ChatMessageList.style";
import myChatApi from "@/apis/chat";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "@/pages/Error/ErrorPage";
import MyChat from "../myChat/MyChat";
import OtherChat from "../otherChat/OtherChat";

interface ChatLog {
  chatLogId: number;
  chatRoomId: number;
  createDate: string;
  messageContents: string;
  userId: number;
  userNickName: string;
  userProfileImg: string;
}

interface ChatMessageListProps {
  userId: number | null;
  chatRoomId: string;
  chargerId: number;
  chargerImg: string;
  chargerName: string;
  chargingSpeed: string;
  createDate: string;
}

export default function ChatMessageList({
  userId,
  chatRoomId,
  chargerId,
  chargerImg,
  chargerName,
  chargingSpeed,
  createDate,
}: ChatMessageListProps) {
  const navigate = useNavigate();
  const { open, close, isOpen } = useToggle(false);
  const chatRoomRef = useRef<HTMLDivElement>(null);

  const {
    data: chatRoomMessages,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["chatRoomMessages", chatRoomId],
    queryFn: () => myChatApi.getChatRoomMessages(chatRoomId),
  });

  const [text, setText] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setText(value);
  };

  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <ErrorPage />;
  }

  return (
    <S.Container>
      <TopNavigationBar
        leftBtn={
          <IconButton icon="arrowLeft" onClick={() => navigate("/chat-list")} />
        }
        text="피카충전"
        rightBtn={<IconButton icon="more" onClick={open} />}
      />
      <ChargerInfoBar
        id={chargerId.toString()}
        image={chargerImg}
        name={chargerName}
        address={chargingSpeed}
      />
      <S.List ref={chatRoomRef}>
        <S.CreatedAt>{getDateFormat(createDate)}</S.CreatedAt>
        {chatRoomMessages && chatRoomMessages.response.length === 0 ? (
          <S.CreatedAt>아직 대화가 없습니다.</S.CreatedAt>
        ) : (
          <>
            {chatRoomMessages.response.map((msg: ChatLog) => {
              if (msg.userId === userId) {
                return (
                  <MyChat
                    createdAt={msg.createDate}
                    text={msg.messageContents}
                  />
                );
              } else {
                return (
                  <OtherChat
                    profileImg={msg.userProfileImg}
                    createdAt={msg.createDate}
                    text={msg.messageContents}
                  />
                );
              }
            })}
          </>
        )}
      </S.List>
      <MessageForm
        text={text}
        onChange={onChange}
        onSubmit={() => console.log("전송됨")}
      />
      {isOpen && <ChatBottomSheet close={close} open={isOpen} />}
    </S.Container>
  );
}
