import styled from "styled-components";

export const ChatBox = styled.div`
  width: 100%;
  margin-right: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 8px;
`;

export const RowBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 80%;
`;

export const ImgBox = styled.div`
  align-self: flex-start;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  flex-shrink: 0;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Text = styled.div`
  padding: 12px;
  text-align: left;
  background-color: ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.gray[400]};
`;

export const CreatedAt = styled.span`
  width: 20%;
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.FONT_SIZE.es};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.gray[300]};
  text-align: left;
`;
