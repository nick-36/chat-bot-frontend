import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  fullName: "",
  userName: "",
  hashedPassword: null,
  userId: null,
  isFetching: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    FETCHING: (state, action) => {
      return (state.isFetching = true);
    },
    LOGIN__SUCCESS: (state, action) => {
      const { token, fullName, userName, userId, hashedPassword } =
        action.payload;

      localStorage.setItem("token", token);
      state.token = token;
      state.fullName = fullName;
      state.userName = userName;
      state.hashedPassword = hashedPassword;
      state.userId = userId;
      state.isFetching = false;
      state.isError = false;
    },
    LOGIN__FAIL: (state, action) => {
      state.isError = false;
      state.isFetching = false;
    },
  },
});

const { reducer, actions } = authSlice;
export const { FETCHING, LOGIN__FAIL, LOGIN__SUCCESS } = actions;

export default reducer;
