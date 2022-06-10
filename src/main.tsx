import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./components/Context";
import ModalProvider from "./components/Modal/Provider";
import Titlebar from "./components/Titlebar";
import "./index.css";
import NotFound from "./pages/404";
import Home from "./pages/home";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <BrowserRouter>
      <Titlebar />
      <div className="h-full w-full flex flex-col overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ModalProvider />
      </div>
    </BrowserRouter>
  </AppProvider>
);
