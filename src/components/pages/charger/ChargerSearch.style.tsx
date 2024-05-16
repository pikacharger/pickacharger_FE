import styled, { css } from "styled-components";
import { flexColumn } from "@/styles/common";
import { ViewStyle } from "@/types";

const inputview = {
    map: css`
        position: absolute;
        padding: 1.5rem;
        width: 100%;
        z-index: 2;
    `,
    list: css`
        position: fixed;
        top: 0;
        width: 390px;
        div div {
            border-radius: 0;
        }
        path {
            fill: ${({ theme }) => theme.PALETTE.gray[200]};
        }
    `,
};

const resultview = {
    map: css`
        border-radius: 5px;
        border: 1px solid ${({ theme }) => theme.PALETTE.gray[200]};
        background-color: ${({ theme }) => theme.PALETTE.white};
        ${flexColumn};
        position: absolute;
        width: 87.5%;
        top: 70px;
        z-index: 2;
    `,
    list: css`
        border: 1px solid ${({ theme }) => theme.PALETTE.gray[200]};
        background-color: ${({ theme }) => theme.PALETTE.white};
    `,
};

export const SearchContainer = styled.div<{ viewstyle: ViewStyle }>`
    ${({ viewstyle }) => inputview[viewstyle]}
`;

export const SearchResultsBox = styled.div<{ viewstyle: ViewStyle }>`
    ${({ viewstyle }) => resultview[viewstyle]}
`;
