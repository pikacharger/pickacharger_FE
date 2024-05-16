import styled from "styled-components";
import { PositionCenter, flexColumn } from "@/styles/common";

export const ChargerStaitionDetail = styled.div`
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 0.5rem;
  padding: 1rem;
  width: 90%;
  height: fit-content;
  max-height: 600px;
  overflow-y: auto;
  ${PositionCenter}
  ${flexColumn}

  a {
    padding: 16px 0;
    display: block;
    border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  }
`;
export const CloseButtonWrapper = styled.div`
  text-align: right;
  width: 92%;
  background-color: white;
  position: fixed;
  right: 16px;
`;
export const ChargerStaitionDetailList = styled.div`
  overflow-y: auto;
  padding: 16px 0;
`;
export const CloseButton = styled.button`
  width: 100%;
  text-align: right;
  display: block;
  background: transparent;
  cursor: pointer;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
`;
export const ChargerDetail = styled.div`
  display: flex;
  align-items: center;
`;

export const DetailRole = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const DetailTitle = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.PALETTE.black};
  margin-bottom: 4px;
`;

export const DetailLocation = styled.p`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ theme }) => theme.PALETTE.gray[400]};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  margin-bottom: 16px;
`;
export const TypeContainer = styled.div`
  margin-left: 8px;
`;

export const DetailType = styled.span`
  background-color: ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 0.2rem;
  padding: 0.25rem 0.5rem;
  color: ${({ theme }) => theme.PALETTE.gray[400]};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  > svg {
    margin-right: 4px;
  }

  > p {
    margin-right: 8px;
  }

  p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  }
`;
