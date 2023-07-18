import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Page404 } from "./views";

const Login = React.lazy(() => import("./views/auth/login/Login"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Settings = React.lazy(() => import("./views/settings/Settings"));

const App = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
