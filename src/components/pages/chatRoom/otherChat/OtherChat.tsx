import React from "react";
import DefaultProfile from "../../chatList/defaultProfile/DefaultProfile";
import * as S from "./OtherChat.style";

export interface OtherChatProps {
  profileImg: string;
  createdAt: string;
  text: string;
}

export default function OtherChat({
  profileImg,
  createdAt,
  text,
}: OtherChatProps) {
  return (
    <S.ChatBox>
      <S.RowBox>
        {profileImg && <S.Img src={profileImg} />}
        {!profileImg && <DefaultProfile size="md" />}
        <S.Text>{text}</S.Text>
      </S.RowBox>
      <S.CreatedAt>{createdAt}</S.CreatedAt>
    </S.ChatBox>
  );
}
