export interface ReviewRequestInfo {
  userId: number | string;
  chargerId: number;
  content: string;
  rating: number;
}

export interface ReviewResponseInfo {
  reviewId: string;
  chargerName: string;
  content: string;
  rating: number;
  imageUrls: string[];
  createAt: Date;
  nickname: string;
  profileImage: string;
  userIdMatch?: boolean;
}

export interface ReviewManagesRequestInfo {
  currentPage: number;
  pageSize: number;
  totalReviews: number;
  reviews: Reviews[];
}

export interface Reviews {
  chargerName: string;
  content: string;
  rating: number;
  imageUrls: string[];
  reviewId: number;
  createAt: Date;
}

export interface ReviewImage {
  createDate: string;
  id: number;
  imgUrl: string[];
  lastModifiedDate: string;
}

export interface ImageFile {
  id: string;
  imageUrl: string;
}

export interface UserReviewResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reviews: any[];
  totalReviews: number;
  currentPage: number;
  pageSize: number;
}

export interface GetUserReviewParams {
  chargerId?: string;
  page: number;
  size: number;
  sort: string;
}
