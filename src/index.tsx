import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./components/Context";
import Titlebar from "./components/Titlebar";
import "./index.css";
import NotFound from "./pages/404";

import Home from "./pages/home";

const root = ReactDOM.createRoot(
  document.getElementById("cobaltic") as HTMLElement
);

root.render(
  <AppProvider>
    <BrowserRouter>
      <Titlebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
