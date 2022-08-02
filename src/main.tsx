import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./components/Context";
import Header from "./components/Header";
import ModalProvider from "./components/Modal/Provider";
import Titlebar from "./components/Titlebar";
import "./index.css";
import NotFound from "./pages/404";
import Download from "./pages/download";
import Finalize from "./pages/finalize";
import Manifest from "./pages/manifest";
import Home from "./pages/home";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <BrowserRouter>
      <Titlebar />
      <div className="h-full w-full flex flex-col overflow-x-hidden">
        <Header />
        <div className="animate__animated animate__fadeInUp px-32" id="home">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manifest" element={<Manifest />} />
            <Route path="/finalize" element={<Finalize />} />
            <Route path="/download" element={<Download />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <ModalProvider />
      </div>
    </BrowserRouter>
  </AppProvider>
);
