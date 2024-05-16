import { styled } from "styled-components";
import { fadeIn } from "@/styles/animations";

export const Container = styled.div`
  padding: 80px 1.5rem;
`;

export const Title = styled.h2`
  margin-bottom: 0.5rem;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

export const Content = styled.div``;

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

export const Wrapper = styled.div`
  animation-name: ${fadeIn};
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
`;
