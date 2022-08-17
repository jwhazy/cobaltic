import { app } from "@tauri-apps/api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { State } from "../utils/constants";
import { AppContext } from "./Context";

function Header() {
  const { state, update } = useContext(AppContext);

  const [version, setVersion] = useState<string>();

  const navigate = useNavigate();

  const updateClick = async () => navigate("/update");

  useEffect(() => {
    app.getVersion().then((v) => setVersion(`${v}-dev`));
  }, []);

  if (state === State.UPDATING) return null;
  return (
    <div className="flex flex-col bg-black h-48 justify-center bg-opacity-25 py-8 animate__animated animate__fadeIn text-center backdrop-filter backdrop-blur-3xl w-screen ">
      <div className=" animate__animated animate__fadeInDown">
        {state === State.CHOOSING_SEASON ||
        State.CHOOSING_MANIFEST ||
        State.FINALIZING ? (
          <h1 className="font-black text-6xl text-gray-200">
            <a className="text-white">COBALTIC</a>
            <a className="text-sm font-normal pl-2">{version}</a>
          </h1>
        ) : (
          "Choose a season"
        )}

        {update ? (
          <p className="text-center text-gray-200">
            Cobaltic {update.version} is ready to be installed.
            <a className="font-bold cursor-pointer" onClick={updateClick}>
              {" "}
              Update now
            </a>
          </p>
        ) : (
          <p className="text-center text-gray-200">
            Easy to use Fortnite manifest downloader
          </p>
        )}
      </div>
    </div>
  );
}

export default Header;
