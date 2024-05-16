import { styled } from "styled-components";
import { flexCenter } from "@/styles/common";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

export const MapContent = styled.div`
  background-color: #ccc;
  width: 100%;
`;

export const Content = styled.div`
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 423px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px 10px 0 0;
  z-index: 1;
`;
export const TitleWrapper = styled.div``;

export const FavoriteList = styled.ul`
  height: 475px;
  overflow: auto;
  padding-bottom: 15.625rem;

  > span {
    display: block;
    width: fit-content;
    margin: 50px auto;
  }
`;

export const IconWrapper = styled.div`
  width: 41px;
  height: 41px;
  margin: -1.2813rem auto 0;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 99px;
  ${flexCenter}
`;

export const Title = styled.h3`
  text-align: center;
  padding: 1rem 0 2rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
`;

export const FavoriteItem = styled.div``;
