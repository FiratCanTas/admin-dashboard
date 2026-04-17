import { createSlice } from "@reduxjs/toolkit";
import users from "../../data/data";

const usersSlice = createSlice({
  name: "users",
  initialState: { users },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
