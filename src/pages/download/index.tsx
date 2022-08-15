import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { invoke } from "@tauri-apps/api";
import { useNavigate } from "react-router-dom";
import { listen } from "@tauri-apps/api/event";
import { AppContext } from "../../components/Context";
import { Method, State } from "../../utils/constants";
import Button from "../../components/Button";
import log from "../../utils/logger";

function DownloadPage() {
  const { directory, method, activeManifest, setState, state } =
    useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    if (method === Method.SPLASH) {
      const args = [
        "-manifest",
        activeManifest?.id as string,
        "-install-dir",
        directory as string,
      ];

      const startSplash = async () => {
        try {
          await invoke("start", { args });
          await listen<string>("splash", (event) => {
            log("error", event.payload);

            if (event.payload === "dead") {
              setState?.(State.DOWNLOAD_CANCELLED);
            } else setStatus(event.payload);
          });
        } catch (e: any) {
          setStatus(e.message);
          setState?.(State.DOWNLOAD_FAILED);
          log("error", e.message);
        }
      };

      startSplash();
    }
  }, [activeManifest?.id, directory, method, setState]);

  switch (method) {
    case Method.SPLASH:
      return (
        <div>
          <div
            className="flex items-center space-x-2 text-gray-200 cursor-pointer mb-6 mt-8"
            onClick={() => {
              invoke("kill");
              setState?.(State.CHOOSING_SEASON);
              navigate("/");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <p>Go back</p>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center space-x-4">
              <img
                src={`/${activeManifest?.icon || "fortnitep.jpg"}`}
                height={48}
                width={48}
                alt={activeManifest?.version}
              />
              <h1 className="font-black text-center">
                {activeManifest?.name
                  ? `${activeManifest?.name} (SPLASH)`
                  : "SPLASH"}
              </h1>
            </div>
            <div>
              <h3>Manifest identifer</h3>
              <p>{activeManifest?.id}</p>
            </div>
            <div>
              <h3>Splash status</h3>
              <p>
                {state === State.DOWNLOAD_CANCELLED
                  ? " The Splash download has been stopped. Go back to the main menu to download again. "
                  : status || "Splash is starting please wait."}
              </p>
            </div>
            <div>
              {state === State.DOWNLOADING && (
                <Button onClick={() => invoke("kill")} className="mt-4">
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div>
          <div
            className="flex items-center space-x-2 text-gray-200 cursor-pointer mb-6"
            onClick={() => {
              setState?.(State.CHOOSING_SEASON);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <p>Go back</p>
          </div>
          <div className="flex items-center space-x-16">
            <div>
              <img
                src={`/${activeManifest?.icon || "fortnitep.jpg"}`}
                height={256}
                width={256}
                alt={activeManifest?.version}
              />
            </div>
            <div>
              <h1 className="font-black mb-2">EXTRA INFORMATION</h1>
              <h3>Directory</h3>
              <p>{directory}</p>
              <h3>Method</h3>
              <p>{method}</p>
              <h3>Manifest identifer</h3>
              <p>{activeManifest?.id}</p>
              <Button
                onClick={() => invoke("splash_downloader")}
                className="mt-4"
              >
                Download Splash
              </Button>
            </div>
          </div>
        </div>
      );
  }

  // if (method === Method.SPLASH) {

  // }
}

export default DownloadPage;
