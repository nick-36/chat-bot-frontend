import { configureStore } from "@reduxjs/toolkit";
import { default as channelReducer } from "./ChannelSlice";

export const store = configureStore({
  reducer: {
    channelReducer,
  },
});
