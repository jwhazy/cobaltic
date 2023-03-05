import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { shell } from "@tauri-apps/api";
import useStage from "../hooks/useStage";
import {
  version as versionAtom,
  updateAvailable as updateAvailableAtom,
} from "../utils/state";

const Header = () => {
  const [version] = useAtom(versionAtom);
  const [updateAvailable] = useAtom(updateAvailableAtom);
  const { stage } = useStage();

  const updateClick = async () =>
    shell.open("https://github.com/jwhazy/cobaltic/releases");

  if (stage === "download") return null;

  return (
    <motion.div
      className=" flex h-[25vh] w-full flex-col items-center justify-center bg-black/30 pb-6 "
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "anticipate" }}
      data-tauri-drag-region
    >
      <div className="flex items-baseline ">
        <h1 className="text-6xl font-black">COBALTIC</h1>
        <p>{version}</p>
      </div>
      {!updateAvailable ? (
        <p className="text-gray-800 dark:text-gray-200">
          Easy to use Fortnite manifest downloader
        </p>
      ) : (
        <p className="text-gray-800 dark:text-gray-200">
          New Cobaltic update available.
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <a className="cursor-pointer font-bold" onClick={updateClick}>
            {" "}
            Update now
          </a>
        </p>
      )}
    </motion.div>
  );
};

export default Header;
