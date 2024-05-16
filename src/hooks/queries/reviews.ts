/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import reviewApi from "@/apis/review";
import { GetUserReviewParams } from "@/types/review";

// const useGetChargerReview = (chargerId: string) => {
//   const { data, ...rest } = useQuery({
//     queryKey: ["getChargerReview"],
//     queryFn: () => {
//       return reviewApi.getChargerReview(chargerId);
//     },
//   });
//   return { data, ...rest };
// };

const useGetChargerReview = (chargerId: string) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: ["getChargerReview"],
    queryFn: ({ pageParam = 0 }) =>
      reviewApi.getChargerReview({
        chargerId,
        page: pageParam,
        size: 5,
        sort: "DESC",
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currentPage + 1;
      const maxPage = Math.ceil(lastPage.totalReviews / lastPage.pageSize);
      return nextPage <= maxPage ? nextPage : undefined;
    },
  });

  return { data, ...rest };
};

const useGetReviewDetail = (reviewId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["getDetailReview"],
    queryFn: () => {
      return reviewApi.getDetailReview(reviewId);
    },
  });
  return { data, ...rest };
};

const useGetUserReview = () => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: ["reviews"],
    queryFn: ({ pageParam = 0 }) =>
      reviewApi.getUserReview({ page: pageParam, size: 5, sort: "DESC" }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currentPage + 1;
      const maxPage = Math.ceil(lastPage.totalReviews / lastPage.pageSize);
      return nextPage <= maxPage ? nextPage : undefined;
    },
  });

  return { data, ...rest };
};

export { useGetChargerReview, useGetUserReview, useGetReviewDetail };
