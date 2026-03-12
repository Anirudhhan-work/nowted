import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { ThemeProvider } from "./context/theme/ThemeState.tsx";
import { NoteProvider } from "./context/Notes/NoteState.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <NoteProvider>
        <App />
      </NoteProvider>
    </ThemeProvider>
  </StrictMode>,
);
