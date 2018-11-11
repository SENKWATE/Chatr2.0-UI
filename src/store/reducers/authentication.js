import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null,
  channels: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
      case actionTypes.FETCH_CHANNELS:
        return {
          ...state,
          channels: action.payload,
        };
    default:
      return state;
  }
};

export default reducer;
