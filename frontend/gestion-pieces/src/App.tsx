import React from "react";
import BusinessCentral from "./BusinessCentral";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Commerciales from "./Commerciales";
import Clients from "./Clients";
import Articles from "./Articles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BusinessCentral />} />
        <Route path="/login" element={<Login />} />
        <Route path="/commerciales" element={<Commerciales />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
