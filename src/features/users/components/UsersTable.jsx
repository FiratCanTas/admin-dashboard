import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, setSort } from "../userSlice";
import { sortUsers } from "./../userSlice";

const UsersTable = () => {
  const { sortBy, sortOrder } = useSelector((state) => state.users);
  const users = useSelector(sortUsers);
  const dispatch = useDispatch();

  const getUserBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "editor":
        return "bg-orange-100 text-orange-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <table width="100%" className="text-center">
        <thead>
          <tr>
            <th
              onClick={() => dispatch(setSort("name"))}
              className="cursor-pointer border"
            >
              Name {sortBy === "name" && (sortOrder === "asc" ? "↓" : "↑")}
            </th>
            <th
              onClick={() => dispatch(setSort("email"))}
              className="cursor-pointer border"
            >
              Email {sortBy === "email" && (sortOrder === "asc" ? "↓" : "↑")}
            </th>
            <th
              onClick={() => dispatch(setSort("role"))}
              className="cursor-pointer border"
            >
              Role {sortBy === "role" && (sortOrder === "asc" ? "↓" : "↑")}
            </th>
            <th
              onClick={() => dispatch(setSort("status"))}
              className="cursor-pointer border"
            >
              Status {sortBy === "status" && (sortOrder === "asc" ? "↓" : "↑")}
            </th>
            <th
              onClick={() => dispatch(setSort("joinDate"))}
              className="cursor-pointer border"
            >
              Join Date{" "}
              {sortBy === "joinDate" && (sortOrder === "asc" ? "↓" : "↑")}
            </th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(({ id, name, email, role, status, joinDate }) => (
            <tr className="border" key={id}>
              <td className="border py-3 px-2">{name}</td>
              <td className="border">{email.slice(0, 6) + "..."}</td>
              <td className="border">
                <span
                  className={`inline-flex w-15 items-center justify-center py-1 rounded-lg text-sm font-medium ${getUserBadgeClass(role)}`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
              </td>
              <td className="border">
                <span
                  className={`inline-flex w-15 items-center justify-center py-1 rounded-lg text-sm font-medium ${status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {status}
                </span>
              </td>
              <td className="border">{joinDate}</td>
              <td className="border">
                <button
                  className="border px-1 text-sm py-0.5 bg-gray-400 cursor-pointer rounded-md shadow"
                  onClick={() => dispatch(deleteUser(id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-2">Users Table</div>
    </div>
  );
};

export default UsersTable;
