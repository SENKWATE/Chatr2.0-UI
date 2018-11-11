import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";

import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

// const setAuthToken = token => {};
const setAuthToken = token => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};


// export const checkForExpiredToken = () => {};
export const checkForExpiredToken = () => {
  return dispatch => {
    // Get token
    const token = localStorage.getItem("token");
    if (token) {
      const currentTime = Date.now() / 1000;
      // Decode token and get user info
      const user = jwt_decode(token);
      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        setAuthToken(token);
        // Set user
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};

// export const login = userData => {};
export const login = (userData, history) => {
  return dispatch => {
    axios
      .post("https://api-chatr.herokuapp.com/login/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
        history.push("/");
      })
      .catch(err => console.error(err.response));
  };
};


// export const signup = userData => {};
export const signup = (userData, history) => {
  return dispatch => {
    axios
      .post("https://api-chatr.herokuapp.com/signup/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
        history.push("/");
      })
      .catch(err => console.error(err.response));
  };
};

// export const logout = () => {};
export const logout = () => {
  setAuthToken();
  return setCurrentUser();
};

export const fetchChannels = () => {
  return dispatch => {
    //This function gets called by Redux Thunk
    axios
      .get("https://api-chatr.herokuapp.com/channels/")
      .then(res => res.data)
      .then(channels =>
        dispatch({
          type: actionTypes.FETCH_CHANNELS,
          payload: channels
        })
      );
  };
};

export const postChannel = (channel) => {
  return dispatch => {
    instance
      .post(`channels/create/`, channel)
      .then(res => res.data)
      .then(createdChannel =>
        dispatch({
          type: actionTypes.POST_CHANNEL,
          payload: createdChannel
        })
      )
      .catch(error => console.error(error.response.data));
  };
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});
