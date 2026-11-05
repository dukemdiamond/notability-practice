import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Solution from "./App.solution";

// Visit /?solution to see the finished version instead of the starter.
const showSolution = new URLSearchParams(window.location.search).has("solution");

createRoot(document.getElementById("root")!).render(
  <StrictMode>{showSolution ? <Solution /> : <App />}</StrictMode>
);
