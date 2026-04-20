import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../userSlice";

const UserSearch = () => {
  const { searchQuery } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  return (
    <div>
      <input
        value={searchQuery}
        onChange={(event) =>
          dispatch(
            setFilter({ name: "searchQuery", value: event.target.value }),
          )
        }
        placeholder="Search..."
        className="border rounded-sm ps-1"
        type="text"
        id="search"
      />
    </div>
  );
};

export default UserSearch;
