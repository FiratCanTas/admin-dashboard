import { createSlice } from "@reduxjs/toolkit";
import users from "../../data/data";

const usersSlice = createSlice({
  name: "users",
  initialState: { users, sortBy: "name", sortOrder: "asc" },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setSort: (state, action) => {
      const newSortBy = action.payload;

      if (state.sortBy === newSortBy) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = newSortBy;
        state.sortOrder = "asc";
      }
    },
  },
});

export const sortedUsers = (state) => {
  const { users, sortBy, sortOrder } = state.users;

  return [...users].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (sortBy === "joinDate") {
      return sortOrder === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }

    // String comparison
    return sortOrder === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });
};

export const { addUser, deleteUser, setSort } = usersSlice.actions;
export default usersSlice.reducer;
