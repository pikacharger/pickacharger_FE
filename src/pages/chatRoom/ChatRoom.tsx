import IconButton from "@/components/common/iconButton/IconButton";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import ChargerInfoBar from "@/components/pages/chatRoom/ChargerInfoBar";
import ChatBottomSheet from "@/components/pages/chatRoom/ChatBottomSheet";
import MessageForm from "@/components/pages/chatRoom/MessageForm";
import MyChat from "@/components/pages/chatRoom/MyChat";
import OtherChat from "@/components/pages/chatRoom/OtherChat";
import { useToggle } from "@/hooks/useToggle";
import { flexColumn } from "@/styles/common";
import React, { useState } from "react";
import styled from "styled-components";

export interface Message {
  text: string;
  createdAt: string;
}

export default function ChatRoom() {
  const { open, close, isOpen } = useToggle(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setText(value);
  };
  const onSubmit = (text: string, createdAt: string) => {
    const message = { text, createdAt };
    setMessages((prev) => [...prev, message]);
    setText("");
  };
  return (
    <Container>
      <TopNavigationBar
        leftBtn={<IconButton icon="arrowLeft" />}
        text="배츠마루"
        rightBtn={<IconButton icon="more" onClick={open} />}
      />
      <ChargerInfoBar
        id="1"
        image="https://plus.unsplash.com/premium_photo-1661598310312-185fd0630045?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVDJUI2JUE5JUVDJUEwJTg0JUVBJUI4JUIwfGVufDB8fDB8fHww"
        name="송정동 개인 충전소"
        address="서울 성동구 동일로 199"
      />
      <List>
        <CreatedAt>2024년 4월 11일</CreatedAt>
        <OtherChat
          profileImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_iPzYmO4980INBLkD7iHIoxyPSD8oM-v7WA&s"
          createdAt="오후 04:55"
          text="유저 프로필 이미지 있을 때"
        />
        <OtherChat
          profileImg=""
          createdAt="오후 04:56"
          text="유저 프로필 이미지 없을 때"
        />
        {messages.length > 0 &&
          messages.map((msg, index) => {
            return (
              <MyChat key={index} createdAt={msg.createdAt} text={msg.text} />
            );
          })}
      </List>
      <MessageForm text={text} onChange={onChange} onSubmit={onSubmit} />
      {isOpen && <ChatBottomSheet close={close} open={isOpen} />}
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  padding-top: 118px;
  ${flexColumn}
`;

const List = styled.div`
  padding: 16px;
  gap: 16px;
  ${flexColumn};
  width: 100%;
  height: 586px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: block;
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.PALETTE.mainColor};
    border-radius: 10px;
  }
`;

const CreatedAt = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.gray[400]};
`;
