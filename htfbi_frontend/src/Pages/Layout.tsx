import Sidenav from './Sidenav';
import IndividualList from './IndividualList';
import AllLists from './AllLists';
import Header from '../components/Header';

function Layout() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidenav />

        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <IndividualList />
        </div>
      </div>
    </>
  )
}

export default Layout;
