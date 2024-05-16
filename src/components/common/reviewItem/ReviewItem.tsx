/* eslint-disable @typescript-eslint/no-explicit-any */
import * as S from "./ReviewItem.style";

import getDateFormat from "@/utils/getDateFormat";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import LineIcon from "../icons/LineIcon";
import RatingWithStar from "../ratingWithStar/RatingWithStar";

export interface ReviewItemProps {
  onClick: () => void;
  date: Date | string;
  address: string;
  rating: string;
  review: string;
  img?: string;
}

export default function ReviewItem(props: ReviewItemProps) {
  const { date, address, rating, review, img, onClick } = props;
  return (
    <S.Container onClick={onClick}>
      <S.Top>
        <S.DateText>{getDateFormat(date)}</S.DateText>
        <S.DetailWrapper>
          <p>상세 보기</p>
          <ArrowRightIcon />
        </S.DetailWrapper>
      </S.Top>

      <S.Content>
        <S.Left>
          <S.Title>
            <S.Address>{address}</S.Address>
            <LineIcon />
            <RatingWithStar rating={rating} />
          </S.Title>
          <S.ReviewText>{review}</S.ReviewText>
        </S.Left>
        {img && (
          <S.Right>
            <S.ImgBox>
              <img src={img} alt="리뷰 이미지" />
            </S.ImgBox>
          </S.Right>
        )}
      </S.Content>
    </S.Container>
  );
}
