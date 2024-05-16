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

export const listViewContainer = styled.div`
    margin: 45px 0 110px;
`;

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
        width : 15px;
        height : 15px;
        margin-right : 0.5rem;
    }
`;
