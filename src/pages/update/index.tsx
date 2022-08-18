import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";
import Button from "../../components/Button";
import { AppContext } from "../../components/Context";
import { State } from "../../utils/constants";
import log from "../../utils/logger";

function Update() {
  const { update, setState, state } = useContext(AppContext);

  const [status, setStatus] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    setState?.(State.UPDATE_READY);
  });

  const updateClick = async () => {
    try {
      setState?.(State.UPDATING);
      const { shouldUpdate } = await checkUpdate();
      if (shouldUpdate) {
        // display dialog
        await installUpdate();

        // install complete, restart app
        await relaunch();
      }
    } catch (error) {
      log("error", error as string);
      setStatus(error as string);
    }
  };

  const cancelClick = async () => navigate("/");

  return (
    <div className="flex flex-row space-x-8 mt-24 mr-64 pb-12">
      <img src="/logo512.png" alt="logo" className="w-48 h-48" />
      <div className="flex flex-col ">
        <h1>Cobaltic {update?.version}</h1>
        <p className=" text-gray-200">
          Cobaltic {update?.version} is ready to be installed.
        </p>
        <div className="mt-4 mb-4">
          <h3>Patch notes</h3>
          <p>
            {update?.body
              ? update?.body
              : "No patch notes available, check the GitHub for more information."}
          </p>
        </div>
        {state === State.UPDATE_READY ? (
          <div className="flex mt-8">
            <Button type="long" className="ml-0 flex-1" onClick={updateClick}>
              Install
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-800 ml-2"
              onClick={cancelClick}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <p>{status}</p>
        )}
      </div>
    </div>
  );
}

export default Update;
