import { styled } from "styled-components";
import { flexColumn } from "@/styles/common";

export const HomeContainer = styled.div`
  & img {
    padding: 1rem 1.5rem;
  }
`;
export const SearchDiv = styled.div`
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.PALETTE.primary[100]};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  & span {
    color: ${({ theme }) => theme.PALETTE.mainColor};
  }
  & p {
    line-height: 1.3;
    &:last-of-type {
      margin-bottom: 0.5rem;
    }
  }
`;

export const MenuDiv = styled.div`
  ${flexColumn}
  padding :1.5rem;
  padding-bottom: 0;
  margin-bottom: 2rem;
`;

export const MenuRow = styled.div`
  display: flex;
  gap: 8px;
  .menuColumn {
    width: 10.25rem;
    height: 164px;
  }
  .menuList {
    ${flexColumn}
    gap: 8px;
    width: 10.5625rem;
  }
`;

export const FavoritesCharger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1.5rem;
  & p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }
  & a {
    color: ${({ theme }) => theme.PALETTE.gray[300]};
    font-size: ${({ theme }) => theme.FONT_SIZE.xs};
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      margin-left: 0.4rem;
    }
    path {
      fill: ${({ theme }) => theme.PALETTE.gray[300]};
    }
  }
`;

export const FavoriteChargerWrapper = styled.div`
  padding: 0 24px 90px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const EmptyFavorite = styled.div`
  color: ${({ theme }) => theme.PALETTE.gray[300]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  margin-top: 3rem;
  text-align: center;
`;
