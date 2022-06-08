import { appWindow } from "@tauri-apps/api/window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

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
        <Button onClick={() => navigate("/")}>
          <p className="font-black text-lg px-2 ">COBALTIC</p>
        </Button>
      </div>
      <div className="ml-auto no-drag flex flex-row bg-header">
        <Button onClick={minimize}>
          <FontAwesomeIcon icon={faWindowMinimize} />
        </Button>
        <Button onClick={exit}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
    </header>
  );
}

export default Titlebar;
