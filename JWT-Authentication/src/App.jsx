import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(
    localStorage.getItem('user') ? true : false
  );

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setShowLogin(true);
  };

  return (
    <div className='container'>
      <h1 className='title'>Authentication Demo</h1>

      {token ? (
        <Dashboard token={token} onLogout={handleLogout} />
      ) : showLogin ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Register onRegister={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;