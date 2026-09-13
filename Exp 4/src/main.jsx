import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./app.css";

import {
  PerformanceProvider,
} from "./context/PerformanceContext";

import {
  PostProvider,
} from "./context/PostContext";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <PerformanceProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </PerformanceProvider>
  </React.StrictMode>
);