// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' used for the login set up
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import HeaderTest from './components/HeaderTest'
import PrivateRoute from './utils/PrivateRoute'

import { AuthProvider } from './context/AuthContext'

import Sidenav from './Pages/Sidenav';
import IndividualList from './Pages/IndividualList';
import Header from './components/Header';
import NoteDetailsCard from './components/NoteDetailsCard';
import ListDetails from './components/ListDetails';
import ListGrid from './components/ListGrid';
import ListForm from './Pages/ListForm';
import NoteForm from './components/NoteForm';
import Vote from './components/Vote';
import CommentsPreview from './components/CommentsPreview';
import CommentsList from './components/CommentsList';
import NotFoundPage from './Pages/NotFoundPage';
import MainLayout from './Pages/MainLayout';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
          { path: '/', element: <ListGrid />, },
          { path: '/list/:listId', element: <ListDetails />, },
          { path: '/note/:noteId', element: <NoteDetailsCard />, },
          { path: '/create-a-new-list', element: <ListForm />, },
          // Add more routes here
        ],
    },
    { path: 'login', element: <LoginPage />, },
]);


function App() {
  return (
    <RouterProvider router={router}>
        <MainLayout />
    </RouterProvider>
  );
}

export default App;

// function App() {
//   return (
//     <>
//       <div className="flex min-h-screen w-full flex-col bg-muted/40">
//         <Sidenav />
//         <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//           <Header />
//           <RouterProvider router={router}/> 
//         </div>
//       </div>
//     </>
//   )
// };

// export default App





// login 

        // <div className="App">
        //     <Router>
        //       <AuthProvider>
        //         <HeaderTest/>
        //         <Routes>
        //             <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
        //             <Route path="/login" element={<LoginPage/>}/>
        //         </Routes>
        //       </AuthProvider>
        //     </Router>
        // </div>