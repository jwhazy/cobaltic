import { ArrowLeft, Minus, X } from "lucide-react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { invoke, process, window as tWindow } from "@tauri-apps/api";
import { toast } from "sonner";
import { Tab } from "./Tab";
import useStage from "../../hooks/useStage";
import { version as versionAtom } from "../../utils/state";

const Titlebar = () => {
  const { stage, setStage } = useStage();

  const [version] = useAtom(versionAtom);

  const handleTitleClick = () => setStage("home");

  const stopSplash = () => {
    invoke("kill");
    toast("Download cancelled.");
    return setStage("home");
  };

  const handleCancel = () => {
    toast("Are you sure you want to cancel?", {
      action: {
        label: "Yes",
        onClick: stopSplash,
      },
    });
  };

  const handleQuit = () => process.exit();

  const handleMinimize = () => tWindow.getCurrent().minimize();

  return (
    <motion.header
      className="fixed z-50 flex h-max w-full select-none grid-cols-3 items-center justify-between bg-black/30 p-1 backdrop-blur-3xl"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "anticipate" }}
      data-tauri-drag-region
    >
      <div className="pointer-events-none flex w-full items-center justify-between">
        <div className="flex">
          {stage !== "home" && (
            <Tab
              className="pointer-events-auto text-black"
              onClick={stage === "download" ? handleCancel : handleTitleClick}
            >
              <ArrowLeft />
            </Tab>
          )}
          {stage !== "download" && (
            <Tab
              className="pointer-events-auto text-black"
              onClick={handleTitleClick}
            >
              <h4 className="pl-1 font-black">COBALTIC</h4>
              <p className="p-1 pl-2">{version}</p>
            </Tab>
          )}
        </div>

        <div className="flex">
          <Tab
            className="pointer-events-auto text-black"
            onClick={handleMinimize}
          >
            <Minus />
          </Tab>

          <Tab className="pointer-events-auto text-black" onClick={handleQuit}>
            <X />
          </Tab>
        </div>
      </div>
    </motion.header>
  );
};

export default Titlebar;
