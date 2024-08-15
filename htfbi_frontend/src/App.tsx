import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import HeaderTest from './components/HeaderTest'
import PrivateRoute from './utils/PrivateRoute'

import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <div className="App">
            <Router>
              <AuthProvider>
                <HeaderTest/>
                <Routes>
                    <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
              </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
