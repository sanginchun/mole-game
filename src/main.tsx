import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import Layout from "./screens/layout";
import Play from "./screens/Play";
import Settings from "./screens/Settings";
import Result from "./screens/Result";
import Scoreboard from "./screens/Scoreboard";

import "@/styles/font.css";
import "@/styles/normalize.css";
import "@/styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Settings />} />
          <Route path="/play" element={<Play />} />
          <Route path="/result" element={<Result />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
