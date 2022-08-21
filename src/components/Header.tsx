import { app } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/shell";
import { useContext, useEffect, useState } from "react";
import { State } from "../utils/constants";
import { AppContext } from "./Context";

function Header() {
  const { state, updateAvailable } = useContext(AppContext);

  const [version, setVersion] = useState<string>();

  const updateClick = async () =>
    open("https://github.com/jwhazy/cobaltic/releases");

  useEffect(() => {
    app.getVersion().then((v) => setVersion(`${v}-dev`));
  }, []);

  if (state === State.UPDATE_READY || state === State.UPDATING)
    return (
      <div className="flex flex-col bg-black h-48 justify-center bg-opacity-25 py-8 animate__animated animate__fadeIn text-center backdrop-filter backdrop-blur-3xl w-screen ">
        <div className=" animate__animated animate__fadeInDown mb-6">
          <h1 className="font-black text-6xl text-gray-200">
            <a className="text-white">COBALTIC UPDATER</a>
          </h1>
        </div>
      </div>
    );

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

        {/* eslint-disable-next-line no-nested-ternary */}
        {updateAvailable ? (
          <p className="text-center text-gray-200">
            New Cobaltic update available.
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
