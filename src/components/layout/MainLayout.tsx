import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../navigation/NavBar';
import Footer from '../footer/Footer';

type TMainLayoutProps = object;

const MainLayout: FC<TMainLayoutProps> = () => {
  return (
    <main>
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
