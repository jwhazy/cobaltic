import { invoke, process } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/Button";
import useStage from "../hooks/useStage";
import { Manifest } from "../types/Manifest";
import log from "../utils/logger";
import {
  customManifest as customManifestAtom,
  directory as directoryAtom,
  selectedManifest as selectedManifestAtom,
} from "../utils/state";

const Download = () => {
  const [customManifest] = useAtom(customManifestAtom);
  const [selectedManifest] = useAtom(selectedManifestAtom);
  const [directory] = useAtom(directoryAtom);

  const [manifest, setManifest] = useState<Manifest>();

  const [status, setStatus] = useState("Initializing...");

  const [done, setDone] = useState(false);

  const { setStage } = useStage();

  const handleQuit = () => process.exit();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGoBack = useCallback(() => setStage("home"), []);

  useEffect(() => {
    if (!selectedManifest && !customManifest) {
      setStage("home");
      toast("Please select a season.");
    }

    if (selectedManifest) setManifest(selectedManifest);

    if (customManifest)
      setManifest({
        id: customManifest as string,
        name: "Custom Manifest",
        url: "https://jacksta.dev/",
        banner: "c2s1b.png",
        icon: "c2s1p.png",
        version: "12.41",
      });
  }, [selectedManifest, customManifest, setStage, manifest?.id, directory]);

  useEffect(() => {
    const args = [
      "-manifest",
      manifest?.id,
      "-install-dir",
      directory as string,
    ];

    const startSplash = async () => {
      // invoke("kill");
      try {
        const isString = (arr: unknown[]) =>
          !!arr.every((item) => typeof item === "string");

        if (!isString(args)) return null;

        await invoke("start", { args });
        await listen<string>("splash", (event) => {
          if (event.payload.includes("Splash killed.")) {
            setStage("home");
            toast("Download stopped. Reason: Manually killed by user.");
          } else if (event.payload.includes("Done!")) {
            setDone(true);
          } else {
            setStatus(
              event.payload.replace(
                /\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}/,
                ""
              )
            );
          }
        });
      } catch (e: unknown) {
        setStage("home");
        log("info", (e as Error).message);
        return toast(`Download stopped, Reason: ${(e as Error).message}`);
      }
    };

    startSplash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directory, manifest?.id]);

  return (
    <motion.div
      className="grid h-[80vh] place-items-center"
      data-tauri-drag-region
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex flex-col items-center space-y-4 text-center"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "circIn" }}
      >
        <img
          src={`/${manifest?.banner || "c1s1b.png"}`}
          width={620}
          className="rounded-2xl"
          alt=""
        />
        {!done ? (
          <div className="flex flex-col items-center">
            <h1 className="font-black">
              DOWNLOADING {manifest?.name?.toUpperCase()}
            </h1>
            <p className="w-2/3 text-center text-gray-800 dark:text-gray-200">
              {status}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="font-black">DOWNLOAD COMPLETE</h1>
            <p className="text-center text-gray-800 dark:text-gray-200">
              {manifest?.name} has been downloaded successfully.
            </p>
            <div className="mt-2 flex space-x-2">
              <Button onClick={handleGoBack}>Go back</Button>
              <Button onClick={handleQuit}>Quit</Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Download;
