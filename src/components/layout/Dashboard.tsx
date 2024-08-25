import { FC } from "react";
import { Outlet } from "react-router-dom";

type TDashboardProps = object;

const Dashboard: FC<TDashboardProps> = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
