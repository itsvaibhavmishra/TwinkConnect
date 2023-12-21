import { createSlice } from "@reduxjs/toolkit";

// import axios from "../../utils/axios";

// initial state for logged in status
const initialState = {
  isLoading: false,
  error: false,
  token: "",
  email: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default slice.reducer;
