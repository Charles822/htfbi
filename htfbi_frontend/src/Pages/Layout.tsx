import Sidenav from './Sidenav';
import IndividualList from './IndividualList';
import AllLists from './AllLists';
import Header from '../components/Header';
import NoteDetailsCard from '../components/NoteDetailsCard';
import ListDetails from '../components/ListDetails';
import ListGrid from '../components/ListGrid';
import ListForm from './ListForm';
import NoteForm from '../components/NoteForm';
import Vote from '../components/Vote';

function Layout() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidenav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <Vote />
        </div>
      </div>
    </>
  )
}

export default Layout;
