import styled from "styled-components";
import { flexAlignCenter, flexColumn } from "@/styles/common";

export const Bar = styled.div`
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  width: 100%;
  max-width: 390px;
  position: fixed;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  ${flexAlignCenter};
  gap: 8px;
  padding: 8px 24px;
`;

export const ImgBox = styled.div`
  width: 45px;
  height: 45px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TextBox = styled.div`
  ${flexColumn};
  gap: 8px;
`;

export const Name = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  color: ${({ theme }) => theme.PALETTE.black};
`;

export const Address = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.es};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.gray[400]};
`;
