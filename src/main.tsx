import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { ThemeProvider } from "./context/theme/ThemeState.tsx";
import { NoteProvider } from "./context/Notes/NoteState.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <NoteProvider>
      <App />
    </NoteProvider>
  </ThemeProvider>,
);
