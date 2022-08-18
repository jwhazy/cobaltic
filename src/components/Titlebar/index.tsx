import { appWindow } from "@tauri-apps/api/window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faWindowMinimize,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { app } from "@tauri-apps/api";
import { useState, useEffect, useContext } from "react";
import TitlebarItem from "./Item";
import { State } from "../../utils/constants";
import { AppContext } from "../Context";

function Titlebar() {
  const navigate = useNavigate();

  const { state } = useContext(AppContext);

  const exit = () => appWindow.close();

  const minimize = () => appWindow.minimize();

  const settings = () => navigate("/settings");

  const [version, setVersion] = useState<string>();

  useEffect(() => {
    app.getVersion().then((v) => setVersion(`${v}-dev`));
  }, []);

  return (
    <header
      data-tauri-drag-region
      className="pl-2 flex justify-between backdrop-filter backdrop-blur-3xl top-0 z-50 drag h-8 sticky bg-black bg-opacity-25 w-full flex-shrink-0 overflow-hidden"
    >
      <div className="flex flex-row no-drag">
        {state !== State.UPDATE_READY ? (
          <TitlebarItem onClick={() => navigate("/")}>
            <p className="font-black text-lg px-2 ">
              COBALTIC<a className="font-normal text-sm pl-2">{version}</a>
            </p>
          </TitlebarItem>
        ) : null}
      </div>
      <div className="ml-auto no-drag flex flex-row bg-header">
        <TitlebarItem onClick={settings}>
          <FontAwesomeIcon icon={faCog} />
        </TitlebarItem>
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
