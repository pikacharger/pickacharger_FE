import styled from "styled-components";
import { flexColumn } from "@/styles/common";

export const Container = styled.section`
  margin: 56px 1.5rem 68px;
  ${flexColumn};
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

export const Title = styled.h3`
  padding-top: 24px;
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
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
