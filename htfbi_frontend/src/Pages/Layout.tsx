import Sidenav from './Sidenav';
import IndividualList from './IndividualList';
import AllLists from './AllLists';
import Header from '../components/Header';
import NoteDetailsCard from '../components/NoteDetailsCard';
import ListDetails from '../components/ListDetails';
import ListGrid from '../components/ListGrid';

function Layout() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidenav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <ListGrid />
        </div>
      </div>
    </>
  )
}

export default Layout;
