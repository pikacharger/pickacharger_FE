import styled from "styled-components";
import { PositionCenter, flexAlignCenter } from "@/styles/common";

export const Background = styled.div`
  backdrop-filter: blur(3px);
  /* background-color: #000; */
  z-index: ${({ theme }) => theme.ZINDEX.confirm};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;
export const Container = styled.div`
  min-width: 20.125rem;
  width: fit-content;
  padding: 1.5rem 1.5rem 1rem;
  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.PALETTE.white};
  ${PositionCenter}
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[200]};
`;
export const Title = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  h3 {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    font-size: ${({ theme }) => theme.FONT_SIZE.lg};
    margin-bottom: 6px;
  }
  p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  }
`;

export const BtnWrapper = styled.div`
  ${flexAlignCenter}
  gap: 1rem;
`;
