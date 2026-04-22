import { createSlice } from "@reduxjs/toolkit";
import users from "../../data/data";
import {
  filterByConditions,
  paginate,
  searchByFields,
  sortByField,
} from "../../utils/dataUtils";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users,
    sortBy: "name",
    sortOrder: "asc",
    filterRole: "all",
    filterStatus: "all",
    searchQuery: "",
    currentPage: 1,
    itemsPerPage: 5,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.currentPage = 1;
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
      const { name, value } = action.payload;
      state[name] = value;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

const getFilteredUsers = (state) => {
  const { users, filterRole, filterStatus, searchQuery } = state.users;

  const searched = searchByFields(users, searchQuery, ["name", "email"]);

  if (filterRole === "all" && filterStatus === "all") return searched;

  const filtered = filterByConditions(searched, [
    { key: "role", value: filterRole },
    { key: "status", value: filterStatus },
  ]);

  return filtered;
};

export const selectFilteredUserCount = (state) => {
  const filteredUserCount = getFilteredUsers(state).length;
  return filteredUserCount;
};

export const selectProcessedUsers = (state) => {
  const { sortBy, sortOrder, currentPage, itemsPerPage } = state.users;

  const filtered = getFilteredUsers(state);

  const sorted = sortByField(filtered, sortBy, sortOrder);

  const result = paginate(sorted, itemsPerPage, currentPage);

  return result;
};

export const { addUser, deleteUser, setSort, setFilter, setPage } =
  usersSlice.actions;
export default usersSlice.reducer;
