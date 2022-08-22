import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreating: false,
  isEditing: false,
  createType: "",
};

const ChannelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    SET_CREATING: (state, action) => {
      state.isCreating = action.payload;
    },
    SET_EDITING: (state, action) => {
      state.isEditing = action.payload;
    },
    SET_CREATETYPE: (state, action) => {
      state.createType = action.payload;
    },
  },
});

const { reducer, actions } = ChannelSlice;
export const { SET_CREATETYPE, SET_CREATING, SET_EDITING } = actions;

export default reducer;
