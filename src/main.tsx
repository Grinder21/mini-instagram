import { createRoot } from "react-dom/client";
import { RouterProvider } from "./app/providers/router";
import "./index.css";
createRoot(document.getElementById("root")!).render(<RouterProvider />);
