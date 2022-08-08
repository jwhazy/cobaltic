import { appWindow } from "@tauri-apps/api/window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { app, invoke } from "@tauri-apps/api";
import { useState, useEffect } from "react";
import TitlebarItem from "./Item";

function Titlebar() {
  const navigate = useNavigate();

  const exit = () => appWindow.close();

  const minimize = () => appWindow.minimize();

  const [version, setVersion] = useState<string>();

  useEffect(() => {
    app.getVersion().then((v) => setVersion(`${v}-dev`));
  }, []);

  return (
    <header
      data-tauri-drag-region
      className="pl-2 flex justify-between backdrop-filter backdrop-blur-3xl top-0 z-50 drag h-8 sticky bg-black bg-opacity-25 w-full flex-shrink-0 overflow-hidden"
    >
      <div className=" flex flex-row no-drag">
        <TitlebarItem onClick={() => navigate("/")}>
          <p className="font-black text-lg px-2 ">
            COBALTIC<a className="font-normal text-sm pl-2">{version}</a>
          </p>
        </TitlebarItem>
        <TitlebarItem onClick={() => invoke("download")}>
          <p className=" text-lg px-2 ">Force Splash download</p>
        </TitlebarItem>
        <TitlebarItem onClick={() => invoke("devtools")}>
          <p className=" text-lg px-2 ">Open DevTools</p>
        </TitlebarItem>
      </div>
      <div className="ml-auto no-drag flex flex-row bg-header">
        <TitlebarItem onClick={minimize}>
          <FontAwesomeIcon icon={faWindowMinimize} />
        </TitlebarItem>
        <TitlebarItem onClick={exit}>
          <FontAwesomeIcon icon={faXmark} />
        </TitlebarItem>
      </div>
    </header>
  );
}

export default Titlebar;
