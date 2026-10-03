import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { SiteProvider } from "./data/siteStore";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SiteProvider><App /></SiteProvider>
  </StrictMode>
);
