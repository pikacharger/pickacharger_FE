/* eslint-disable @typescript-eslint/no-explicit-any */
import * as S from "./ChargerReviewList.style";
import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import TopNavigationBar from "@/components/common/topNavigationBar/TopNavigationBar";
import IconButton from "@/components/common/iconButton/IconButton";
import ReviewItem from "@/components/common/reviewItem/ReviewItem";
import { useGetChargerReview } from "@/hooks/queries/reviews";

import { useValidParams } from "@/hooks/useValidParams";
import Loading from "@/components/common/loading/Loading";

export default function ChargerReviewList() {
  const { id: chargerId } = useValidParams();

  const navigate = useNavigate();

  const observer = useRef<IntersectionObserver | null>(null);

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useGetChargerReview(chargerId);

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
        text={data?.pages[0]?.reviews[0].chargerName}
        leftBtn={<IconButton icon="arrowLeft" onClick={() => navigate(-1)} />}
      />

      <S.Container>
        <S.Title>
          <span>{data?.pages[0].totalReviews}</span>개의 리뷰
        </S.Title>
        <S.Content>
          {data?.pages[0].totalReviews == 0 && (
            <S.EmptyText>
              <p>아직 리뷰가 없어요!</p>
              <span>충전소에 대한 경험을 공유해 주세요.</span>
            </S.EmptyText>
          )}
          {data?.pages.map((page, pageIndex) => {
            const isLastPage = pageIndex === data.pages.length - 1;
            return page.reviews.map((el, reviewIndex) => {
              if (el.reviewId === null) return null;
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
                  key={reviewId}
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
