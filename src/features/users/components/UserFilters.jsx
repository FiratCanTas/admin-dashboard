import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../userSlice";

const UserFilters = () => {
  const dispatch = useDispatch();
  const { filterRole, filterStatus } = useSelector(
    (state) => state.users.users,
  );

  return (
    <div className="flex justify-center gap-8">
      <div className="bg-gray-300 px-2 border rounded-sm">
        <label htmlFor="roleFilter" className="me-3">
          Role:
        </label>
        <select
          value={filterRole}
          onChange={(event) =>
            dispatch(
              setFilter({ name: "filterRole", value: event.target.value }),
            )
          }
          className=" focus-visible:outline-0 bg-gray-300"
          name="roleFilter"
          id="roleFilter"
        >
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      <div className="bg-gray-300 border px-2 rounded-sm">
        <label htmlFor="statusFilter" className="me-3">
          Statu:
        </label>
        <select
          value={filterStatus}
          onChange={(event) =>
            dispatch(
              setFilter({ name: "filterStatus", value: event.target.value }),
            )
          }
          className=" focus-visible:outline-0 bg-gray-300"
          name="statusFilter"
          id="statusFilter"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default UserFilters;
