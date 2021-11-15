import { maxApproval, _Token } from "../../hooks";

const initialState = {
  token1: 0,
  token2: 1,
  token1_value: 0,
  token2_value: 0,
  info: null,
};

export const swapReducer = (state: any = initialState, action: any) => {
  // console.log(action);

  // CHANGE_PAIR
  const swapLogic = () => {
    const tmp = state.token1;
    const tmp_value = state.token1_value;
    return {
      ...state,
      token1: state.token2,
      token2: tmp,
      token1_value: state.token2_value,
      token2_value: tmp_value,
    };
  };

  switch (action.type) {
    case "CHANGE_PAIR":
      return swapLogic();

    case "SET_VALUE":
      // Now it's always token1
      const newInfo = action.info && state.info;
      return {
        ...state,
        token1_value:
          action.tokenType === "token1" ? action.value : state.token1_value,
        token2_value: newInfo?.price
          ? _Token(newInfo?.price)
          : state.token2_value,
      };

    case "SET_TOKEN":
      if (
        action.token ===
        (action.tokenType === "token1" ? state.token2 : state.token1)
      ) {
        return swapLogic();
      }
      return {
        ...state,
        token1: action.tokenType === "token1" ? action.token : state.token1,
        token2: action.tokenType === "token2" ? action.token : state.token2,
      };

    case "SET_APPROVED":
      const info = { ...state.info, allowance: maxApproval };
      return {
        info,
        ...state,
      };
    case "SET_INFO":
      if (!action.info) return { ...state };
      return {
        ...state,
        info: action.info,
        token2_value: action.info?.price
          ? _Token(action.info.price)
          : state.token2_value,
      };
    default:
      return state;
  }
};
