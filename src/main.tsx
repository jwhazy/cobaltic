import { AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Toaster } from "sonner";
import { attachConsole, error } from "tauri-plugin-log-api";
import StateHandler from "./components/StateHandler";
import Titlebar from "./components/Titlebar";

import "./styles/globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StateHandler />,
  },
]);

attachConsole();
window.addEventListener("error", (e) => error(e.message));
window.addEventListener("unhandledrejection", (e) => error(e.reason));
window.addEventListener("rejectionhandled", (e) => error(e.reason));
window.addEventListener("contextmenu", (event) => event.preventDefault());

ReactDOM.createRoot(document.getElementById("cobaltic") as HTMLElement).render(
  <AnimatePresence mode="wait">
    <Toaster closeButton theme="dark" key="toaster" />
    <Titlebar key="titlebar" />
    <SimpleBar style={{ maxHeight: "100vh" }} key="simplebar">
      <RouterProvider
        router={router}
        key={router.state.navigation.location?.pathname}
      />
    </SimpleBar>
  </AnimatePresence>
);
