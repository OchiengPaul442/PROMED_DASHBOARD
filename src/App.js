import "./App.css";
import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Page404 } from "./views";
import { ContextAPi } from "./views/apis/context/Context";

const Login = React.lazy(() => import("./views/auth/login/Login"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Settings = React.lazy(() => import("./views/settings/Settings"));

const App = () => {
  const [userData, setUserData] = useState(null);

  return (
    <>
      <Router>
        <ContextAPi.Provider value={{ userData, setUserData }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </ContextAPi.Provider>
      </Router>
    </>
  );
};

export default App;
