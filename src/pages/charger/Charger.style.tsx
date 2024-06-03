import { ViewStyle } from "@/types";
import styled, { css } from "styled-components";

const ButtonView = {
    map: css`
        position: absolute;
        z-index: 2;
        & button {
            border-radius: 100px;
            width: 125px;
        }

        p {
            color: ${({ theme }) => theme.PALETTE.gray[400]};
        }
    `,
    list: css`
        position: fixed;

        & button {
            border-radius: 100px;
            width: 125px;
        }
        path {
            fill: ${({ theme }) => theme.PALETTE.white};
        }
    `,
};

export const ChargerContainer = styled.div`
    height: 100%;
`;

export const listViewContainer = styled.div``;

export const ButtonContainer = styled.div<{ viewtype: ViewStyle }>`
    ${({ viewtype }) => ButtonView[viewtype]}
    bottom: 90px;
    width: 390px;
    z-index: 1;
    button {
        margin: auto;
    }
    svg {
        width: 20px;
        height: 20px;
        margin-right: 0.5rem;
    }
`;
export const SearchButtonContainer = styled.div`
    position: absolute;
    z-index: 3;
    top: 90px;
    left: 110px;
    & button {
        border-radius: 100px;
        border: none;
        width: 170px;
    }
    & svg {
        width: 15px;
        height: 15px;
        margin-right: 0.5rem;
    }
`;

export const HistoryContainer = styled.div`
    margin-top: 65px;
`;

export const HistoryTitle = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    p {
        font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    }
    button {
        background-color: ${({ theme }) => theme.PALETTE.white};
        cursor: pointer;
    }
`;

export const SearchHistory = styled.div`
    display: flex;
    margin: 0 0.5rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    p {
        margin: 0.5rem;
    }
`;

export const HistoryItem = styled.div`
    flex: 0 0 auto;
    margin: 0.5rem;
    padding: 0.3rem 0.7rem;
    background-color: ${({ theme }) => theme.PALETTE.primary[100]};
    border-radius: 1rem;
`;

export const HistoryKeyword = styled.span`
    cursor: pointer;
    color: ${({ theme }) => theme.PALETTE.mainColor};
`;

export const RemoveButton = styled.button`
    background-color: ${({ theme }) => theme.PALETTE.primary[100]};
    color: ${({ theme }) => theme.PALETTE.gray[300]};
    margin: 0.3rem;
    cursor: pointer;
`;
