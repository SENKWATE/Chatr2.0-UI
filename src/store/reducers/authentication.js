import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null,
  channels: [],
  channel: [],
  loading: true
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
        channel: action.payload,
        loading: false
      };
    case actionTypes.POST_MESSAGE:
      return {
        ...state,
        channel: state.channel.concat(action.payload)
      };
    case actionTypes.SET_AUTHOR_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
