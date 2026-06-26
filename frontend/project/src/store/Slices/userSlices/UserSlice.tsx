import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../../utilities/Interfaces";

interface InitialStateType {
  users: UserType[];
  token: string | null;
  user: UserType | null;
}
const storageToken = localStorage.getItem("token");
const parsedToken = storageToken ? storageToken : null;
const storageUser = localStorage.getItem("user");
const parsedUser = storageUser ? JSON.parse(storageUser) : null;
const initialState: InitialStateType = {
  users: [],
  user: parsedUser,
  token: parsedToken,
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
    setRegisterUser: (state, action: PayloadAction<UserType>) => {
      state.users.push(action.payload);
    },
    setLoginUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;

      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
  },
});
export const { setUsers, setRegisterUser, setLoginUser, setToken } =
  UserSlice.actions;

export default UserSlice.reducer;
