import styled from "styled-components";
import { flexColumn } from "@/styles/common";

export const Container = styled.section`
  width: 100%;
  padding-top: 56px;
  ${flexColumn}
`;

export const List = styled.div`
  ${flexColumn};
  width: 100%;
  height: 720px;
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

export const EmptyText = styled.div`
  text-align: center;
  padding-top: 100px;
  p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    color: ${({ theme }) => theme.PALETTE.gray[400]};
    margin-bottom: 4px;
  }
  span {
    display: inline-block;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
    font-size: ${({ theme }) => theme.FONT_SIZE.xs};
    color: ${({ theme }) => theme.PALETTE.gray[400]};
  }
`;
