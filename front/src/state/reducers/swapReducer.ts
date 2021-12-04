import { maxApproval } from "@hooks"
import { _Token } from "@token"

const initialState = {
    token0: 0,
    token1: 1,
    token0_value: 0,
    token1_value: 0,
    info: null
}

export const swapReducer = (state: any = initialState, action: any) => {
    // console.log(action);

    // CHANGE_PAIR
    const swapLogic = () => {
        const tmp = state.token0
        const tmp_value = state.token0_value
        return {
            ...state,
            token0: state.token1,
            token1: tmp,
            token0_value: state.token1_value,
            token1_value: tmp_value
        }
    }

    switch (action.type) {
        case "CHANGE_PAIR":
            return swapLogic()

        case "SET_VALUE":
            // Now it's always token0
            const newInfo = action.info && state.info
            return {
                ...state,
                token0_value:
                    action.tokenType === "token0"
                        ? action.value
                        : state.token0_value,
                token1_value: newInfo?.price
                    ? _Token(newInfo?.price)
                    : state.token1_value
            }

        case "SET_TOKEN":
            if (
                action.token ===
                (action.tokenType === "token0" ? state.token1 : state.token0)
            ) {
                return swapLogic()
            }
            return {
                ...state,
                token0:
                    action.tokenType === "token0" ? action.token : state.token0,
                token1:
                    action.tokenType === "token1" ? action.token : state.token1
            }

        case "SET_APPROVED":
            const info = { ...state.info, allowance: maxApproval }
            return {
                info,
                ...state
            }
        case "SET_INFO":
            if (!action.info) return { ...state }
            return {
                ...state,
                info: action.info,
                token1_value: action.info?.price
                    ? _Token(action.info.price)
                    : state.token1_value
            }
        default:
            return state
    }
}
