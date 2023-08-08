import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

// initial state for logged in status
const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // for changing state to logged in
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },

    // for changing state to logged out
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

// action for logging in user
export function LoginUser(formValues) {
  // form values for logging in user

  return async (dispatch, getState) => {
    // login request to {BASE_URL}/auth/login api
    await axios
      .post(
        "/auth/login",
        {
          ...formValues, // destructuring email and password
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // set login status to true
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

// action for signing out user
export function LogoutUser(formValues) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.signOut());
  };
}

export default slice.reducer;
