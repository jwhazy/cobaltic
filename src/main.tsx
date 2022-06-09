import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./components/Context";
import Titlebar from "./components/Titlebar";
import "./index.css";
import NotFound from "./pages/404";
import Home from "./pages/home";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <BrowserRouter>
      <div className="h-full w-full flex flex-col ">
        <Titlebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AppProvider>
);
