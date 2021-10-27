const initialState = {
  token1: 0,
  token2: 1,
};

export const swapReducer = (state: object = initialState, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        token1: 1,
        token2: 0,
      };
    default:
      return state;
  }
};
