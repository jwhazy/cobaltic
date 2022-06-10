import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { shell } from "@tauri-apps/api";
import { State } from "../../utils/constants";
import { AppContext } from "../../components/Context";
import Spinner from "../../components/Spinner";
import Manifest from "../../components/Manifest";

export default function ChooseManifest() {
  const { setState, manifests, setActiveManifest } =
    React.useContext(AppContext);

  return (
    <div className="flex flex-col justify-between">
      <div
        className="flex items-center space-x-2 text-gray-200 cursor-pointer"
        onClick={() => {
          setState?.(State.CHOOSING_SEASON);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Go back</p>
      </div>
      <h1 className="font-bold text-3xl text-center">
        Choose a specific version
      </h1>
      <p className="text-center mb-3 text-gray-200">
        Version you want not listed?{" "}
        <a
          className="text-blue-400 hover:text-blue-500 hover:underline cursor-pointer"
          onClick={() => {
            shell.open("https://github.com/notsamicc/Fortnite-Builds");
          }}
        >
          Click here.
        </a>
      </p>
      <div className="my-8 flex flex-row flex-wrap flex-grow-0 align-center justify-center">
        {manifests ? (
          Object.keys(manifests).map((manifest) => {
            const data = manifests[manifest as unknown as number];
            return (
              <Manifest
                key={data.name}
                title={data.name || data.id}
                icon={data?.icon || "fortnitep.jpg"}
                banner={data?.banner || "fortniteb.jfif"}
                subtitle={data.id}
                onClick={() => {
                  setActiveManifest?.(data);
                  setState?.(State.FINALIZING);
                }}
              />
            );
          })
        ) : (
          <>
            <p className="text-center mb-3 text-gray-200 ">
              Loading manifests, this won&apos;t take a second...
            </p>
            <Spinner />
          </>
        )}
      </div>
    </div>
  );
}
