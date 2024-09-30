import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { LoginForm } from './Pages/NewLoginPage';
import SignUpForm from './Pages/SignUpForm';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
          { path: '/', element: <ListGrid />, },
          { path: '/list/:slug', element: <ListDetails />, },
          { path: '/note/:noteSlug', element: <NoteDetailsCard />, },
          { path: '/create-a-new-list', element: <ListForm />, },
          // Add more routes here
        ],
    },
    { path: 'login', element: <LoginPage />, },
    { path: 'login/new', element: <LoginForm />, },
    { path: 'signup', element: <SignUpForm />, },
]);


function App() {
  return (
    <AuthProvider> 
        <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;