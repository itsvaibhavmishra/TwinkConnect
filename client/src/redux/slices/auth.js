import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { ShowSnackbar, resetAppState } from "./app";
import { socket } from "../../socket";
import { resetConversationState } from "./conversation";

// initial state for logged in status
const initialState = {
  isLoggedIn: false,
  isLoading: false,
  error: false,
  token: "",
  email: "",
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

    // updating email state
    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },

    // Reset authentication state to its initial values
    resetAuthState: (state) => {
      return initialState;
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
        if (response.data.token) {
          // set login status to true
          dispatch(
            slice.actions.logIn({
              isLoggedIn: true,
              token: response.data.token,
            })
          );

          window.localStorage.setItem("user_id", response.data.user_id);
        } else {
          // updating email state
          dispatch(
            slice.actions.updateRegisterEmail({ email: formValues.email })
          );
          setTimeout(() => {
            window.location.href = "/auth/verify";
          }, 2000);
        }

        // show snackbar for login action
        dispatch(
          ShowSnackbar({
            severity: response.data.status,
            message: response.data.message,
          })
        );

        // updating isLoading back to false and error false
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        // show error snackbar
        dispatch(
          ShowSnackbar({
            severity: error.status,
            message: error.message,
          })
        );

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
    // Disconnect the socket if it exists
    if (socket) {
      const user_id = window.localStorage.getItem("user_id");

      // Emit the "end" event to the server with the user_id
      socket.emit("end", { user_id });
    }

    // removing user id from local storage
    window.localStorage.removeItem("user_id");

    dispatch(slice.actions.signOut());

    // Dispatch the resetAuthState action to clear the authentication state
    dispatch(resetConversationState());
    dispatch(resetAuthState());
    dispatch(resetAppState());

    // show snackbar for logout action
    dispatch(
      ShowSnackbar({
        severity: "success",
        message: "Logged Out",
      })
    );
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
        // show snackbar for reset password action
        dispatch(
          ShowSnackbar({
            severity: response.data.status,
            message: response.data.message,
          })
        );

        // updating isLoading back to false and error false
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        // show snackbar for error
        dispatch(
          ShowSnackbar({
            severity: error.status,
            message: error.message,
          })
        );

        // setting loading to false and error to true
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

// action for new password
export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    // updating state for isLoading to true and error false
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/reset-password",
        {
          ...formValues, // destructuring passwords
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // show snackbar for new password action
        dispatch(
          ShowSnackbar({
            severity: response.data.status,
            message: response.data.message,
          })
        );

        // setting status to logged in
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
        // show snackbar for error
        dispatch(
          ShowSnackbar({
            severity: error.status,
            message: error.message,
          })
        );

        // setting loading to false and error to true
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

// action for create account
export function RegisterUser(formValues) {
  return async (dispatch, getState) => {
    // updating state for isLoading to true and error false
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/register",
        {
          ...formValues,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // show snackbar for register action
        dispatch(
          ShowSnackbar({
            severity: response.data.status,
            message: response.data.message,
          })
        );

        // updating email state
        dispatch(
          slice.actions.updateRegisterEmail({ email: formValues.email })
        );

        // updating isLoading back to false and error false
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        // show snackbar for error
        dispatch(
          ShowSnackbar({
            severity: error.status,
            message: error.message,
          })
        );

        // setting loading to false and error to true
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      })
      .finally(() => {
        if (!getState().auth.error) {
          setTimeout(() => {
            window.location.href = "/auth/verify";
          }, 2000);
        }
      });
  };
}

// action for adding email to redux store
export function AddEmail(formValues) {
  return async (dispatch, getState) => {
    // updating state for isLoading to true and error false
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    try {
      // updating email state
      dispatch(slice.actions.updateRegisterEmail({ email: formValues.email }));

      // show snackbar for add email action
      dispatch(
        ShowSnackbar({
          severity: "success",
          message: "Email Added Successfully",
        })
      );

      // updating isLoading back to false and error false
      dispatch(
        slice.actions.updateIsLoading({ isLoading: false, error: false })
      );
    } catch (error) {
      // show snackbar for error
      dispatch(
        ShowSnackbar({
          severity: error,
          message: "Could not add email",
        })
      );

      // setting loading to false and error to true
      dispatch(
        slice.actions.updateIsLoading({ isLoading: false, error: true })
      );
    }
  };
}

// action for sending new otp
export function SendOTP(formValues) {
  return async (dispatch, getState) => {
    // updating state for isLoading to true and error false
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/send-otp",
        {
          ...formValues,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // show snackbar for send otp action
        dispatch(
          ShowSnackbar({
            severity: response.data.status,
            message: response.data.message,
          })
        );

        // updating email state
        dispatch(
          slice.actions.updateRegisterEmail({ email: formValues.email })
        );

        // updating isLoading back to false and error false
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        // show snackbar for error
        dispatch(
          ShowSnackbar({
            severity: error.status,
            message: error.message,
          })
        );

        // setting loading to false and error to true
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

// action for verify email
export function VerifyOTP(formValues) {
  return async (dispatch, getState) => {
    // updating state for isLoading to true and error false
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

    await axios
      .post(
        "/auth/verify-otp",
        {
          ...formValues,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // show snackbar for verify otp action
        dispatch(
          ShowSnackbar({
            severity: response.data.status,
            message: response.data.message,
          })
        );

        // set login status to true
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );

        window.localStorage.setItem("user_id", response.data.user_id);

        // updating isLoading back to false and error false
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        // show snackbar for error
        dispatch(
          ShowSnackbar({
            severity: error.status,
            message: error.message,
          })
        );

        // setting loading to false and error to true
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      });
  };
}

export const { resetAuthState } = slice.actions;

export default slice.reducer;
