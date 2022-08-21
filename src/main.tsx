import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { attachConsole, error } from "tauri-plugin-log-api";
import { AppProvider } from "./components/Context";
import Header from "./components/Header";
import ModalProvider from "./components/Modal/Provider";

import Titlebar from "./components/Titlebar";

import "animate.css";
import "./index.css";

import NotFound from "./pages/404";
import Download from "./pages/download";
import Finalize from "./pages/finalize";
import Manifest from "./pages/manifest";
import Home from "./pages/home";
import Settings from "./pages/settings";

attachConsole();
window.addEventListener("error", (e) => error(e.message));
window.addEventListener("unhandledrejection", (e) => error(e.reason));
window.addEventListener("rejectionhandled", (e) => error(e.reason));
// window.addEventListener("contextmenu", (event) => event.preventDefault());

ReactDOM.createRoot(document.getElementById("cobaltic")!).render(
  <AppProvider>
    <BrowserRouter>
      <Titlebar />
      <Header />
      <div
        className="animate__animated animate__fadeInUp px-32 overflow-visible"
        id="home"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manifest" element={<Manifest />} />
          <Route path="/finalize" element={<Finalize />} />
          <Route path="/download" element={<Download />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ModalProvider />
    </BrowserRouter>
  </AppProvider>
);
