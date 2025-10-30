import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./routes/Layout";
import DetailView from "./routes/DetailView";
import NotFound from "./routes/NotFound";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/coinDetails/:symbol" element={<DetailView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
