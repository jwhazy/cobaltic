import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { State } from "../../utils/constants";
import { AppContext } from "../../components/Context";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spinner from "../../components/Spinner";

export default function ChooseSeason() {
  const { manifests, activeManifest } = React.useContext(AppContext);
  const { setActiveManifest, setState, setSeason, setModal } =
    useContext(AppContext);

  return (
    <div className="flex flex-col justify-between space-y-4">
      <div className="flex flex-col justify-between">
        <h1 className="font-bold text-3xl text-center">Use a manifest</h1>
        <p className="text-center mb-3 text-gray-200">
          Already know the version you want? Enter it below.
        </p>
        <div className="mt-1 relative rounded-md shadow-sm flex space-x-2">
          <Input
            onChange={(e) => {
              setActiveManifest?.({
                id: e.target.value,
                url: `https://raw.githubusercontent.com/VastBlast/FortniteManifestArchive/main/Fortnite/Windows/${e.target.value}.manifest`,
              });
            }}
            value={activeManifest?.id}
            placeholder="Manifest identifer"
          />
          <Button
            onClick={() => {
              try {
                if (!activeManifest) throw new Error("No manifest id");
                setState?.(State.FINALIZING);
              } catch (e: any) {
                setModal?.({
                  title: "ERROR",
                  message: (e as Error).message,
                  state: true,
                  children: undefined,
                  type: "error",
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </div>
      <p className="text-center text-gray-300">or</p>
      <div>
        <h1 className="font-bold text-3xl text-center">Choose a season</h1>
        <p className="text-center mb-3 text-gray-200">
          Choose a season to install from the list below.
        </p>
        <div className="flex flex-row flex-wrap flex-grow-0 align-center">
          {manifests ? (
            Object.keys(manifests).map((chosenSeason) => {
              const manifest = manifests[chosenSeason];
              return (
                <button
                  key={chosenSeason}
                  onClick={() => {
                    setSeason?.(manifest);
                    setState?.(State.CHOOSING_MANIFEST);
                  }}
                  type="button"
                  className="ml-2 py-2 px-3 border bg-opacity-10 hover:bg-opacity-25 bg-black text-white transition border-gray-700 placeholder-gray-400 hover:outline-none hover:ring-1 hover:ring-gray-300 hover:ring-opacity-50 shadow-sm disabled:text-gray-500 mt-1 block rounded-l-md rounded-md"
                >
                  {chosenSeason}
                </button>
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}
