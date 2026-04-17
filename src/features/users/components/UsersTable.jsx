import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../userSlice";

const UsersTable = () => {
  const users = useSelector((state) => state.users.users);
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
      <table className="text-center w-full">
        <caption className="mb-3">Users Table</caption>
        <thead>
          <tr>
            <th className="border">Name</th>
            <th className="border">Email</th>
            <th className="border">Role</th>
            <th className="border">Status</th>
            <th className="border">Join Date</th>
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
    </div>
  );
};

export default UsersTable;
