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

//1. buraya direkt kullanacagin veri gelsin users yani
//2. [...filteredUsers] tekrar kopya etmen gerekiyor mu gerekmiyor mu emin ol yoksa direkt filteredUsers verisini kullan.
//3. asagidaki finkdiyonun ismini duzelt sortUsers
//4. fonksiyonun birden cok islevi bunlari parcalara bol ve her bir fonksiyonun bir islevi olsun.

export const sortUsers = (state) => {
  console.log("calistim");

  const {
    users,
    sortBy,
    sortOrder,
    filterRole,
    filterStatus,
    searchQuery,
    currentPage,
    itemsPerPage,
  } = state.users;

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

  return [...filteredUsers]
    .sort((a, b) => {
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
    })
    .slice(currentPage * itemsPerPage - 5, currentPage * itemsPerPage);
};

export const { addUser, deleteUser, setSort, setFilter, setPage } =
  usersSlice.actions;
export default usersSlice.reducer;
