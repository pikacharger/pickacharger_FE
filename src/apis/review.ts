import { api } from "./@config";
import { AxiosResponse } from "axios";
import { GetUserReviewParams, ReviewManagesRequestInfo } from "@/types/review";

const reviewApi = {
  postReview(data: FormData) {
    return api.post("review", data).then((response) => response.data);
  },
  deleteReview(reviewId: string) {
    return api.delete(`/review/${reviewId}`).then((response) => response.data);
  },
  patchReview(data: FormData, reviewId: string) {
    return api
      .patch(`/review/${reviewId}`, data)
      .then((response) => response.data);
  },
  getUserReview({ page, size, sort }: GetUserReviewParams) {
    return api
      .get(`/review/users/info`, {
        params: { page, size, sort },
      })
      .then(
        (response: AxiosResponse<ReviewManagesRequestInfo>) => response.data
      );
  },
  getEditReview(reviewId: string) {
    return api
      .get(`/review/update/${reviewId}`)
      .then((response) => response.data);
  },
  getDetailReview(reviewId: string) {
    return api
      .get(`/review/detail/${reviewId}`)
      .then((response) => response.data);
  },
  getChargerReview({ chargerId, page, size, sort }: GetUserReviewParams) {
    return api
      .get(`/review/charger/${chargerId}`, {
        params: { page, size, sort },
      })
      .then(
        (response: AxiosResponse<ReviewManagesRequestInfo>) => response.data
      );
  },
};

export default reviewApi;
