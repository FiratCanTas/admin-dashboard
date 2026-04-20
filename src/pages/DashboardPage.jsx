import React from "react";
import UsersTable from "../features/users/components/UsersTable";
import UserFilters from "../features/users/components/UserFilters";

const DashboardPage = () => {
  return (
    <div>
      Dashboard Page
      <UserFilters />
      <UsersTable />
    </div>
  );
};

export default DashboardPage;
