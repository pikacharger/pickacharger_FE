import * as S from "./Rating.style";
import { useState, MouseEvent, useEffect } from "react";
import StarIcon from "@/components/common/icons/StarIcon";

const ratingArr = [1, 2, 3, 4, 5];
const mainColor = "#02c0c0";
const defaultColor = "#EEEEEE";

export interface RatingProps {
  name?: string;
  value?: number;
  onChange: (value: string | number, name: string) => void;
}

export default function Rating({
  name = "rating",
  onChange,
  value = 1,
}: RatingProps) {
  const [rating, setRating] = useState<number>(value);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleStarClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = Number(e.currentTarget.value);
    setRating(value);
    onChange(value, name);
  };

  return (
    <S.Container>
      {ratingArr.map((el) => (
        <S.IconWrapper key={el}>
          <button onClick={handleStarClick} value={el} name={name}>
            <StarIcon
              width="28"
              height="27"
              color={el <= (rating || 0) ? mainColor : defaultColor}
            />
          </button>
        </S.IconWrapper>
      ))}
    </S.Container>
  );
}
