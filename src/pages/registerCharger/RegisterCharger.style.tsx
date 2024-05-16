import { flexAlignCenter, flexColumn } from "@/styles/common";
import styled from "styled-components";

export const Container = styled.section``;

export const Box = styled.div`
  position: relative;
`;

export const SearchResultsBox = styled.div`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[200]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  ${flexColumn};
  position: absolute;
  width: 100%;
  top: 80px;
  left: 0;
  z-index: 1;
`;

export const Main = styled.div`
  padding: 80px 1.5rem 72px;
  ${flexColumn}
  gap: 1rem;
`;

export const ColumnBox = styled.div`
  ${flexColumn};
`;

export const RowBox = styled.div`
  ${flexAlignCenter};
`;
