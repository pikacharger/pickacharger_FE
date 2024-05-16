/* eslint-disable @typescript-eslint/no-unused-vars */
import * as S from "./ReviewDetail.style";

import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import LineIcon from "@/components/common/icons/LineIcon";
import RatingWithStar from "@/components/common/ratingWithStar/RatingWithStar";
import IconButton from "@/components/common/iconButton/IconButton";
import RightIcon from "@/components/common/icons/RightIcon";
import ReviewImages from "@/components/pages/reviewDetail/reviewImages/ReviewImages";

import { useToggle } from "@/hooks/useToggle";
import { useValidParams } from "@/hooks/useValidParams";
import getDateFormat from "@/utils/getDateFormat";

import ReviewBottomSheet from "@/components/pages/reviewDetail/reviewBottomSheet/ReviewBottomSheet";

import { useGetReviewDetail } from "@/hooks/queries/reviews";
import Loading from "@/components/common/loading/Loading";
import { useNavigate } from "react-router-dom";

export default function ReviewDetail() {
  const navigate = useNavigate();
  const { id } = useValidParams();
  const { open, close, isOpen } = useToggle(false);
  const { data, isLoading } = useGetReviewDetail(id);

  if (isLoading) return <Loading />;

  const {
    reviewId,
    profileImage,
    nickname,
    content,
    createAt,
    chargerName,
    rating,
    imageUrls,
    userIdMatch,
  } = data;

  return (
    <>
      <TopNavigationBar
        leftBtn={<IconButton icon="arrowLeft" onClick={() => navigate(-1)} />}
      />

      <RightIcon />
      <S.Container>
        <S.Top>
          {/* 작성자 프로필 */}
          <S.ProfileWrapper>
            <S.ProfileImageBox>
              <S.Profile src={profileImage}></S.Profile>
            </S.ProfileImageBox>

            <S.ProfileBox>
              <S.UserNickName>{nickname}</S.UserNickName>
              <LineIcon />
              <S.DateText>{getDateFormat(createAt)}</S.DateText>
            </S.ProfileBox>
          </S.ProfileWrapper>
          {userIdMatch && (
            <S.MoreIconWrapper>
              <IconButton icon={"more"} onClick={open} />
            </S.MoreIconWrapper>
          )}
        </S.Top>

        <S.Content>
          {/* 리뷰 타이틀 */}
          <S.Title>
            <S.Address>{chargerName}</S.Address>
            <LineIcon />
            <RatingWithStar rating={String(rating)} />
          </S.Title>

          {/* 리뷰 내용 */}
          <S.ReviewContent>
            <S.ReviewText>{content}</S.ReviewText>
            <ReviewImages imgs={imageUrls} />
          </S.ReviewContent>
        </S.Content>
      </S.Container>
      {isOpen && (
        <ReviewBottomSheet close={close} open={isOpen} reviewId={reviewId} />
      )}
    </>
  );
}
