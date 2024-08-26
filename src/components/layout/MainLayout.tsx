import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navigation/NavBar";
import Footer from "../footer/Footer";

type TMainLayoutProps = object;

const MainLayout: FC<TMainLayoutProps> = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
