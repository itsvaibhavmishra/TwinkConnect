import { createSlice } from "@reduxjs/toolkit";
// import axios from "../../utils/axios";

// initial state for contacts menu
const initialState = {
  status: "",
  error: "",

  user: {
    id: "",
    name: "",
    email: "",
    avatar: "",
    status: "",
    token: "",
  },
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // logout reducer
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        avatar: "",
        status: "",
        token: "",
      };
    },
  },
});

export default slice.reducer;
