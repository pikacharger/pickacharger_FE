import { atom } from "jotai";
import { ReviewType } from "@/pages/reviewWrite/ReviewWrite";

export const reviewAtom = atom<ReviewType>({
  chargerId: null,
  chargerName: "",
  rating: 1,
  content: "",
  userIdMatch: true,
  imgUrl: [],
});
