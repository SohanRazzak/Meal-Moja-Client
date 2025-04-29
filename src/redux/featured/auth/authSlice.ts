import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  email: string;
  role: string;
  phoneNumber: string;
  userId: string;
  image?: string;
  name?: string;
  iat?: number;
  exp?: number;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Exporting actions
export const { setUser, logoutUser } = authSlice.actions;

// Export Selector
export const selectCurrentToken = (state: RootState) =>
  state.combinedPersist.auth.token;
export const selectCurrentUser = (state: RootState) =>
  state.combinedPersist.auth.user;

// Exporting default reducers
export default authSlice.reducer;
