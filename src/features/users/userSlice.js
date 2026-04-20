import { createSlice } from "@reduxjs/toolkit";
import users from "../../data/data";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users,
    sortBy: "name",
    sortOrder: "asc",
    filterRole: "all",
    filterStatus: "all",
    searchQuery: "",
  },
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
    setFilter: (state, action) => {
      console.log("action", action.payload);

      const { name, value } = action.payload;
      state[name] = value;
    },
  },
});

export const sortedUsers = (state) => {
  const { users, sortBy, sortOrder, filterRole, filterStatus, searchQuery } =
    state.users;

  const filteredUsers = users
    .filter(
      (user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter(
      (user) =>
        (filterRole === "all" || user.role === filterRole) &&
        (filterStatus === "all" || user.status === filterStatus),
    );

  return [...filteredUsers].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (sortBy === "joinDate") {
      return sortOrder === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }

    return sortOrder === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });
};

export const { addUser, deleteUser, setSort, setFilter } = usersSlice.actions;
export default usersSlice.reducer;
