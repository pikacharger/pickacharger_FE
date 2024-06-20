import styled from "styled-components";

export const ChatBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 8px;
`;

export const CreatedAt = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.es};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.gray[300]};
  text-align: right;
  width: 20%;
  flex-shrink: 0;
`;

export const Text = styled.div`
  max-width: 80%;
  padding: 12px;
  text-align: left;
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.white};
  overflow-wrap: break-word;
`;
