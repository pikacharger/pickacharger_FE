import { ISearchResult } from "@/types/myCharger";
import axios from "axios";

export const searchAddress = async (
  debouncedKeyword: string = "",
  callback: React.Dispatch<React.SetStateAction<ISearchResult[]>>
) => {
  if (debouncedKeyword === "") {
    return;
  }
  const URL = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${debouncedKeyword}&size=3`;
  try {
    const res = await axios.get(URL, {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_API_KEY}`,
      },
    });
    callback(res.data.documents);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
