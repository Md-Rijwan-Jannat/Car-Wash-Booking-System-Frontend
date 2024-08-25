import { FC } from "react";
import { Outlet } from "react-router-dom";

type TAuthProps = object;

const Auth: FC<TAuthProps> = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Auth;
