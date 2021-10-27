const initialState = {
  token1: 0,
  token2: 1,
  token1_value: 0,
  token2_value: 0,
};

export const swapReducer = (state: any = initialState, action: any) => {
  console.log(action);

  switch (action.type) {
    case "CHANGE_PAIR":
      const tmp = state.token1;
      const tmp_value = state.token1_value;
      return {
        ...state,
        token1: state.token2,
        token2: tmp,
        token1_value: state.token2_value,
        token2_value: tmp_value,
      };

    case "SET_VALUE":
      return {
        ...state,
        token1_value:
          action.tokenType === "token1" ? action.value : state.token1_value,
        token2_value:
          action.tokenType === "token2" ? action.value : state.token1_value,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token1: action.tokenType === "token1" ? action.token : state.token1,
        token2: action.tokenType === "token2" ? action.token : state.token2,
      };
    default:
      return state;
  }
};
