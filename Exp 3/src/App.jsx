import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { getCurrentUser } from "./utils/auth";

function App() {
  const [user, setUser] = useState(getCurrentUser());

  const handleLogin = () => {
    setUser(getCurrentUser());
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;