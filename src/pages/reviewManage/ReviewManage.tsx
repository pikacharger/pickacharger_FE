/* eslint-disable @typescript-eslint/no-explicit-any */
import * as S from "./ReviewManage.style";

import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "@/components/common/iconButton/IconButton";
import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import ReviewItem from "@/components/common/reviewItem/ReviewItem";

import { useGetUserReview } from "@/hooks/queries/reviews";
import Loading from "@/components/common/loading/Loading";

export default function ReviewManage() {
  const navigate = useNavigate();

  const observer = useRef<IntersectionObserver | null>(null);
  const { data, isLoading, fetchNextPage, hasNextPage } = useGetUserReview();

  const lastReviewElementRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage]
  );

  const handleReviewItemClick = (reviewId: string) => {
    navigate(`/review/${reviewId}`);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <TopNavigationBar
        leftBtn={<IconButton icon="arrowLeft" onClick={() => navigate(-1)} />}
        text={"리뷰 관리"}
      />
      <S.Container>
        <S.Title>
          내가 작성한 <span>{data?.pages[0].totalReviews}</span>개의 리뷰
        </S.Title>
        <S.Content>
          {data?.pages[0].reviews.length == 0 && (
            <S.EmptyText>
              <p>아직 리뷰가 없어요!</p>
              <span>충전소에 대한 경험을 공유해 주세요.</span>
            </S.EmptyText>
          )}
          {data?.pages.map((page, pageIndex) => {
            const isLastPage = pageIndex === data.pages.length - 1;
            return page.reviews.map((el, reviewIndex) => {
              const isLastReview =
                isLastPage && reviewIndex === page.reviews.length - 1;
              const {
                reviewId,
                createAt,
                chargerName,
                rating,
                content,
                imageUrls,
              } = el;
              return (
                <S.Wrapper
                  ref={isLastReview ? lastReviewElementRef : null}
                  key={reviewId + 1}
                >
                  <ReviewItem
                    onClick={() => handleReviewItemClick(String(reviewId))}
                    key={reviewId}
                    date={createAt}
                    address={chargerName}
                    rating={String(rating)}
                    review={content}
                    img={imageUrls[0]}
                  />
                </S.Wrapper>
              );
            });
          })}
        </S.Content>
      </S.Container>
    </>
  );
}
