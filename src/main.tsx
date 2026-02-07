
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import "./styles/design-system.css";

  const rootEl = document.getElementById("root") ?? document.body;
  createRoot(rootEl).render(<App />);
  