import React, {useContext, useState} from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'

function LoginPage() {
  const { loginUser, user } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    await loginUser(e);
    if (user) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" required />
      <input name="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;