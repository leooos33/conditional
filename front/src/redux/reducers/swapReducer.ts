import { BigNumber } from "@ethersproject/bignumber";
import { tokenList } from "../../contracts";
import { getAmount, Token, _Token } from "../../hooks";

const initialState = {
  token1: 0,
  token2: 1,
  token1_value: 0,
  token2_value: 0,
  approvedTokenList: Array(tokenList.length).fill(false),
  tokenToApproveId: 0,
  amount: null,
  snapshot: null,
};

export const swapReducer = (state: any = initialState, action: any) => {
  // console.log(action);

  // CHANGE_PAIR
  const swapLogic = () => {
    const tmp = state.token1;
    const tmp_value = state.token1_value;
    newState = {
      ...state,
      token1: state.token2,
      token2: tmp,
      token1_value: state.token2_value,
      token2_value: tmp_value,
    };
    return {
      ...newState,
      tokenToApproveId: getMissingToken(newState),
    };
  };

  let newState;
  switch (action.type) {
    case "CHANGE_PAIR":
      return swapLogic();

    case "SET_VALUE":
      // TODO: change it
      // Now it's always token1
      const newAmount = action.amount && state.amount;
      newState = {
        ...state,
        token1_value:
          action.tokenType === "token1" ? action.value : state.token1_value,
        token2_value: newAmount?.price && state.token2_value,
      };
      return {
        ...newState,
        tokenToApproveId: getMissingToken(newState),
      };

    case "SET_TOKEN":
      if (
        action.token ===
        (action.tokenType === "token1" ? state.token2 : state.token1)
      ) {
        return swapLogic();
      }
      newState = {
        ...state,
        token1: action.tokenType === "token1" ? action.token : state.token1,
        token2: action.tokenType === "token2" ? action.token : state.token2,
      };
      return {
        ...newState,
        tokenToApproveId: getMissingToken(newState),
      };

    case "SET_APPROVED":
      const _approvedTokenList = [...state.approvedTokenList];
      _approvedTokenList[action.tokenType] = true;
      newState = {
        ...state,
        approvedTokenList: _approvedTokenList,
      };
      return {
        ...newState,
        tokenToApproveId: getMissingToken(newState),
      };
    case "SET_AMOUNT":
      if (!action.amount) return { ...state };
      return {
        ...state,
        amount: action.amount,
        token2_value: action.amount?.price
          ? _Token(BigNumber.from(action.amount.price))
          : state.token2_value,
      };
    default:
      return state;
  }
};

function getMissingToken(props: any) {
  if (!props.approvedTokenList[props.token1]) return props.token1;
  if (!props.approvedTokenList[props.token2]) return props.token2;
  return -1;
}
