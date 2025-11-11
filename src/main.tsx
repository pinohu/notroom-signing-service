import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize app first
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize PWA and Web Vitals after app loads (non-blocking)
try {
  // Dynamic imports to avoid blocking app initialization
  Promise.all([
    import("./utils/pwa").then((module) => module.registerServiceWorker()),
    import("./utils/webVitals").then((module) => module.initWebVitals()),
  ]).catch((error) => {
    console.warn("Failed to initialize PWA/Web Vitals:", error);
  });
} catch (error) {
  console.warn("Failed to load PWA/Web Vitals modules:", error);
}
