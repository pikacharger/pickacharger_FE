import { styled } from "styled-components";
import { flexAlignCenter, flexColumn } from "@/styles/common";

export const Input = styled.div``;

export const Wrapper = styled.div`
  padding: 1rem 0.75rem;
  ${flexAlignCenter}
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;

export const SearchResultsBox = styled.div`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[200]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  ${flexColumn};
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 1;
`;
