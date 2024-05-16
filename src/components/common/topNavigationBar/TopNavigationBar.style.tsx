import styled from "styled-components";

export const Container = styled.div`
  width: 390px;
  height: 56px;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.ZINDEX.nav};
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  color: ${({ theme }) => theme.PALETTE.black};
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-bottom: 0.5px solid ${({ theme }) => theme.PALETTE.gray[100]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyleBox = styled.div`
  width: 20px;
  height: 20px;
`;
