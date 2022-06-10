import { appWindow } from "@tauri-apps/api/window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import TitlebarItem from "./Item";

function Titlebar() {
  const navigate = useNavigate();

  const exit = () => appWindow.close();

  const minimize = () => appWindow.minimize();

  return (
    <header
      data-tauri-drag-region
      className="pl-2 flex justify-between backdrop-filter backdrop-blur-3xl top-0 z-50 drag h-8 sticky bg-black bg-opacity-25 w-full flex-shrink-0"
    >
      <div className=" flex flex-row no-drag">
        <TitlebarItem onClick={() => navigate("/")}>
          <p className="font-black text-lg px-2 ">COBALTIC</p>
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
