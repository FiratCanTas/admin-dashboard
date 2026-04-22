import React from "react";
import UsersTable from "../features/users/components/UsersTable";
import UserFilters from "../features/users/components/UserFilters";
import UserSearch from "../features/users/components/UserSearch";
import Pagination from "../shared/components/Pagination";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 px-2">
      <p className="mb-5">Dashboard Page</p>
      <div className="flex  justify-center gap-10">
        <UserFilters />
        <UserSearch />
      </div>
      <UsersTable />
      <Pagination />
    </div>
  );
};

export default DashboardPage;
