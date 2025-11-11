import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerServiceWorker } from "./utils/pwa";
import { initWebVitals } from "./utils/webVitals";

// Initialize PWA
registerServiceWorker();

// Initialize Web Vitals tracking
initWebVitals();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
