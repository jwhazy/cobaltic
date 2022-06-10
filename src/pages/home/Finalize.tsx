import { faArrowLeft, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dialog, invoke } from "@tauri-apps/api";
import React from "react";
import Button from "../../components/Button";
import { AppContext } from "../../components/Context";
import Input from "../../components/Input";
import { Method, State } from "../../utils/constants";

export default function Finalize() {
  const { directory, setDirectory, setState, setMethod, setModal } =
    React.useContext(AppContext);

  const getDirectory = () => {
    dialog.open({ directory: true }).then((value) => {
      if (typeof value === "string") {
        setDirectory?.(value as string);
      } else {
        setDirectory?.("Something goofed.");
      }
    });
  };

  const checkDirectoryExists = async (incomingDirectory: string) =>
    invoke("check_directory_exists", { directory: incomingDirectory });

  const start = async (m: Method) => {
    try {
      if (directory && (await checkDirectoryExists(directory as string))) {
        if (m === Method.NATIVE)
          throw new Error("Built-in downloading is not supported yet.");
        setMethod?.(m);
        setState?.(State.DOWNLOADING);
      } else {
        throw new Error("The selected directory does not exist.");
      }
    } catch (e) {
      setModal?.({
        title: "ERROR",
        message: (e as Error).message,
        state: true,
        children: undefined,
        type: "error",
      });
    }
  };
  return (
    <div className="flex flex-col justify-between">
      <div
        className="flex items-center space-x-2 text-gray-200 cursor-pointer"
        onClick={() => {
          setState?.(State.CHOOSING_MANIFEST);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Go back</p>
      </div>
      <h1 className="font-bold text-3xl text-center">Ready to start?</h1>
      <p className="text-center mb-3 text-gray-200">
        Choose a folder and the download method.
      </p>

      <div className="mt-1 relative rounded-md shadow-sm flex">
        <Input
          onChange={(e) => {
            setDirectory?.(e.target.value);
          }}
          value={directory}
          placeholder="Download directory"
        />
        <Button
          type="long"
          onClick={getDirectory}
          className="ml-2 py-2 px-3 border bg-opacity-10 hover:bg-opacity-25 bg-black text-white transition border-gray-700 placeholder-gray-400 hover:outline-none hover:ring-1 hover:ring-gray-300 hover:ring-opacity-50 shadow-sm disabled:text-gray-500 mt-1 block w-10 rounded-l-md rounded-md"
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </Button>
      </div>
      <div className="mt-8 mb-2 relative rounded-md shadow-sm flex justify-center items-center flex-row">
        <Button
          type="long"
          onClick={() => {
            start(Method.SPLASH);
          }}
          className="ml-2 py-2 px-12 border bg-opacity-10 hover:bg-opacity-25 bg-black text-white transition border-gray-700 placeholder-gray-400 hover:outline-none hover:ring-1 hover:ring-gray-300 hover:ring-opacity-50 shadow-sm disabled:text-gray-500 mt-1 block rounded-l-md rounded-md"
        >
          Splash (recommended)
        </Button>
        <Button
          type="long"
          onClick={() => {
            start(Method.NATIVE);
          }}
        >
          Built-in (experimental)
        </Button>
        <Button
          type="long"
          onClick={() => {
            start(Method.LOG);
          }}
          className="ml-2 py-2 px-12 border bg-opacity-10 hover:bg-opacity-25 bg-black text-white transition border-gray-700 placeholder-gray-400 hover:outline-none hover:ring-1 hover:ring-gray-300 hover:ring-opacity-50 shadow-sm disabled:text-gray-500 mt-1 block rounded-l-md rounded-md"
        >
          Log to console (debug only)
        </Button>
      </div>
    </div>
  );
}
