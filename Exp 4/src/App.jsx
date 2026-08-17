import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import PostsPage from "./pages/PostsPage";
import DraftsPage from "./pages/DraftsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <Sidebar />

        <div className="main-area">

          <Header />

          <main>

            <Routes>

              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/calendar"
                element={<CalendarPage />}
              />

              <Route
                path="/posts"
                element={<PostsPage />}
              />

              <Route
                path="/drafts"
                element={<DraftsPage />}
              />

              <Route
                path="/analytics"
                element={<AnalyticsPage />}
              />

              <Route
                path="/settings"
                element={<SettingsPage />}
              />

            </Routes>

          </main>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;