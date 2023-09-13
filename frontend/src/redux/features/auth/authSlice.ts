import { userDataType } from "@/types/userJwtPayload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  userToken: string | undefined;
  user: null | userDataType;
};

type Payload = {
  userToken: string;
  user: userDataType;
};

const initialState = {
  userToken: undefined,
  user: null,
} as InitialState;

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
