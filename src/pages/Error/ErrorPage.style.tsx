import { styled } from "styled-components";
import { flexColumn } from "@/styles/common";

export const Container = styled.div`
  padding: 1.5rem;
  height: 100vh;
  ${flexColumn}
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const TitleBox = styled.div`
  text-align: center;

  h2 {
    font-size: 32px;
    margin-bottom: 16px;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
  p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  }
`;

export const ButtonWrapper = styled.div``;
