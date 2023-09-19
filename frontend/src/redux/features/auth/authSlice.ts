import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userDataType = {
  userToken: string | undefined;
  user: {
    id: number;
    username: string;
    email: string;
    user_type: string;
  } | null;
};

type Payload = {
  userToken: string;
  user: {
    id: number;
    username: string;
    email: string;
    user_type: string;
  };
};

const initialState = {
  userToken: undefined,
  user: null,
} as userDataType;

const authSlice = createSlice({
  name: "auth" as string,
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<Payload>) => {
      state.userToken = action.payload.userToken;
      state.user = action.payload.user;
      localStorage.setItem("userToken", action.payload.userToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    userLoggedOut: (state) => {
      state.userToken = undefined;
      state.user = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
    },
  },
});

export default authSlice.reducer;
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
