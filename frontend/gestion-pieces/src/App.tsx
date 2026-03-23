import React from "react";
import BusinessCentral from "./BusinessCentral";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BusinessCentral />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
