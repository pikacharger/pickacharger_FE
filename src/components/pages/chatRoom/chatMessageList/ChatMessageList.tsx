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
import MyChat from "../myChat/MyChat";
import OtherChat from "../otherChat/OtherChat";
import useCheckUserInfo from "@/hooks/useCheckUserInfo";
interface ChatRoomInfo {
  chargerId: number;
  chargerImg: string[];
  chargerName: string;
  chargingType: string;
  createDate: string;
}
interface ChatLog {
  chatLogId: number;
  chatRoomId: number;
  createDate: string;
  messageContents: string;
  userId: number | null;
  userNickName: string;
  userProfileImg: string | null | undefined;
}
interface ChatMessageListProps {
  chatRoomId: string;
  chatRoomInfo: ChatRoomInfo;
  initialMessages: ChatLog[];
}

export default function ChatMessageList({
  chatRoomId,
  chatRoomInfo,
  initialMessages,
}: ChatMessageListProps) {
  const navigate = useNavigate();
  const { open, close, isOpen } = useToggle(false);
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const { user } = useCheckUserInfo();

  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setText(value);
  };
  const onSubmit = (text: string) => {
    const date = new Date();
    const isoDate = date.toISOString();
    const message = {
      // DB에서 데이터를 받기 전까지 임시로 가짜 데이터 사용
      chatLogId: Date.now(),
      chatRoomId: Number(chatRoomId),
      createDate: isoDate,
      messageContents: text,
      userId: user.id,
      userNickName: user.nickName,
      userProfileImg: user.profileImage,
    };
    setMessages((prev) => [...prev, message]);
    setText("");
  };

  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, [messages]);

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
        id={chatRoomInfo.chargerId.toString()}
        image={chatRoomInfo.chargerImg[0]}
        name={chatRoomInfo.chargerName}
        address={chatRoomInfo.chargingType}
      />
      <S.List ref={chatRoomRef}>
        <S.CreatedAt>{getDateFormat(chatRoomInfo.createDate)}</S.CreatedAt>
        {messages && messages.length === 0 ? (
          <S.CreatedAt>
            대화를 기다리고 있어요. 무엇이든 물어보세요!
          </S.CreatedAt>
        ) : (
          <>
            {messages.map((msg: ChatLog) => {
              if (msg.userId === user.id) {
                return (
                  <MyChat
                    key={msg.chatLogId}
                    createdAt={msg.createDate}
                    text={msg.messageContents}
                  />
                );
              } else {
                return (
                  <OtherChat
                    key={msg.chatLogId}
                    profileImg={msg.userProfileImg ?? ""}
                    createdAt={msg.createDate}
                    text={msg.messageContents}
                  />
                );
              }
            })}
          </>
        )}
      </S.List>
      <MessageForm text={text} onChange={onChange} onSubmit={onSubmit} />
      {isOpen && <ChatBottomSheet close={close} open={isOpen} />}
    </S.Container>
  );
}
