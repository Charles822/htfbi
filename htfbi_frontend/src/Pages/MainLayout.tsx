import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidenav from './Sidenav';

function MainLayout() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidenav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
