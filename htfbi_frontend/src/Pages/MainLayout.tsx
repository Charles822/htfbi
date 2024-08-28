import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidenav from './Sidenav';

function MainLayout() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="fixed sticky top-0 z-10 border-r bg-white">
          <Header />
        </div>
        <div className="flex flex-1">
          <div className="flex-shrink-0">
            <Sidenav />
          </div>
          <div className="flex flex-col flex-grow sm:gap-4 sm:py-4 sm:pl-14 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
