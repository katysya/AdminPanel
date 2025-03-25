import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../../../app/providers/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <header>Header</header>
      <AppRoutes />
      <footer>Footer</footer>
    </BrowserRouter>
  </StrictMode>
);
