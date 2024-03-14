import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    LogoutUser: (state) => {
      state.user=null;
    },
  },
});

export const { SetUser,LogoutUser } = userSlice.actions;
