import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./src/components/Layout/Layout";
import App from "./src/App";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/" replace={true}></Navigate>} />
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
      </Route>
    </Routes>
  );
}

export default Router;
