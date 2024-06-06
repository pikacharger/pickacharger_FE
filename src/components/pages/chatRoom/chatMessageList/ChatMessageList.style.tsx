import styled from "styled-components";
import { flexColumn } from "@/styles/common";

export const Container = styled.section`
  width: 100%;
  padding-top: 118px;
  ${flexColumn}
`;

export const List = styled.div`
  position: relative;
  padding: 16px;
  gap: 16px;
  ${flexColumn};
  width: 100%;
  height: 586px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: block;
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.PALETTE.mainColor};
    border-radius: 10px;
  }
`;

export const CreatedAt = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.gray[400]};
`;
