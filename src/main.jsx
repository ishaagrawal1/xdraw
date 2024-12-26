import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PrismaneProvider } from "@prismane/core";

createRoot(document.getElementById("root")).render(
  <PrismaneProvider>
    <App />
  </PrismaneProvider>
);
