import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null,
  channels: [],
  channel: []
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
        channels: action.payload
      };
    case actionTypes.POST_CHANNEL:
      return {
        ...state,
        channels: state.channels.concat(action.payload)
      };
    case actionTypes.FETCH_CHANNEL_DETAIL:
      return {
        ...state,
        channel: action.payload
      };
    case actionTypes.POST_MESSAGE:
      return {
        ...state,
        channel: state.channel.concat(action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
