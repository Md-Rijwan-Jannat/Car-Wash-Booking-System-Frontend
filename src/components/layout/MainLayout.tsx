import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navigation/NavBar";
import Footer from "../footer/Footer";
import BackButton from "../serviceSlots/BackButton";

type TMainLayoutProps = object;

const MainLayout: FC<TMainLayoutProps> = () => {
  return (
    <div className="max-w-7xl mx-auto md:px-4">
      <NavBar />
      <BackButton />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
