import getDateFormat from "@/utils/getDateFormat";
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
        {profileImg ? (
          <S.ImgBox>
            <S.Img src={profileImg} />
          </S.ImgBox>
        ) : (
          <S.ImgBox>
            <DefaultProfile size="md" />
          </S.ImgBox>
        )}
        <S.Text>{text}</S.Text>
      </S.RowBox>
      <S.CreatedAt>{getDateFormat(createdAt)}</S.CreatedAt>
    </S.ChatBox>
  );
}
