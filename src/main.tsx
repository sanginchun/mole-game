import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import Play from "./screens/Play";
import Settings from "./screens/Settings";
import Result from "./screens/Result";
import Scoreboard from "./screens/Scoreboard";

import "./styles/index.css";
import "./styles/normalize.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Settings />} />
        <Route path="/play" element={<Play />} />
        <Route path="/result" element={<Result />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
