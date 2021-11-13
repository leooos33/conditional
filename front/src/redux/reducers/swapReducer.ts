import { tokenList } from "../../contracts";
import { Token } from "../../hooks";

const initialState = {
  token1: 0,
  token2: 1,
  token1_value: 0,
  token2_value: 0,
  approvedTokenList: Array(tokenList.length).fill(false),
  tokenToApproveId: 0,
  amount: null,
};

let amount;

export const swapReducer = (state: any = initialState, action: any) => {
  // console.log(action);

  let newState;
  switch (action.type) {
    case "CHANGE_PAIR":
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

    case "SET_VALUE":
      newState = {
        ...state,
        token1_value:
          action.tokenType === "token1" ? action.value : state.token1_value,
        token2_value:
          action.tokenType === "token2" ? action.value : state.token2_value,
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
        return state;
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
      return {
        ...state,
        amount: action.amount,
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
