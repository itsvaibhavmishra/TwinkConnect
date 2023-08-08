import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

// initial state for logged in status
const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  error: false,
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

    // updating loading and error state
    updateIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
  },
});

// action for logging in user
export function LoginUser(formValues) {
  // form values for logging in user
  return async (dispatch, getState) => {
    // updating state for isLoading to true and error false
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

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

        // updating isLoading back to false and error false
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);

        // setting loading to false and error to true
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

// action for signing out user
export function LogoutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.signOut());
  };
}

// action for reset password
export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    // updating state for isLoading to true and error false
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    // login request to {BASE_URL}/auth/login api
    await axios
      .post(
        "/auth/forgot-password",
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
        // reset link sent response
        console.log(response);

        // updating isLoading back to false and error false
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        console.log(error);

        // setting loading to false and error to true
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export default slice.reducer;
