import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { AppContext } from "../../components/Context";
import { Method, State } from "../../utils/constants";
import Button from "../../components/Button";

export default function Download() {
  const { directory, method, activeManifest, setState } =
    useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    if (method === Method.SPLASH) {
      invoke("start", { directory, manifest: activeManifest?.id });
    }
  });

  const listenOutput = async () => {
    await listen("event-name", (event): any => {
      const e = event.payload as Record<string, any>;
      // setStatus(e?.message);

      console.log(e);
    });
  };

  listenOutput();

  if (method === Method.SPLASH) {
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
              src={`/src/public/${activeManifest?.icon || "fortnitep.jpg"}`}
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
          </div>
          <div>
            <p>{status || "Please check the console window opened."}</p>
          </div>
        </div>
      </div>
    );
  }

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
            src={`/src/public/${activeManifest?.icon || "fortnitep.jpg"}`}
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
          <Button onClick={() => invoke("splash_downloader")} className="mt-4">
            Download Splash
          </Button>
        </div>
      </div>
    </div>
  );
}
