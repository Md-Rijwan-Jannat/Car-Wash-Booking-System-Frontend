import { FC } from "react";
import { Outlet } from "react-router-dom";

type TAuthProps = object;

const Auth: FC<TAuthProps> = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <Outlet />
    </div>
  );
};

export default Auth;
