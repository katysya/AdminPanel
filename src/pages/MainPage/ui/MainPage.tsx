import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SideBar } from "@/widgets/Sidebar";
import "@app/styles/main.css";
import "@app/styles/global.scss";
import "flowbite";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SideBar />
    </BrowserRouter>
  </StrictMode>
);
