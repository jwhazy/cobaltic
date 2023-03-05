import { invoke } from "@tauri-apps/api";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect } from "react";
import useStage from "../hooks/useStage";
import Home from "../pages";
import Download from "../pages/download";
import Options from "../pages/options";
import { seasons, updateAvailable, version } from "../utils/state";
import Header from "./Header";

const options = {
  home: () => <Home key="welcome" />,
  options: () => <Options key="options" />,
  download: () => <Download key="download" />,
};

export default function StateHandler() {
  const { stage } = useStage();
  const [, setSeasons] = useAtom(seasons);
  const [, setVersion] = useAtom(version);
  const [, setUpdateAvailable] = useAtom(updateAvailable);

  useEffect(() => {
    async function init() {
      const m = (await invoke("get_manifests")) as string;
      const v = (await invoke("get_version")) as string;
      const u = (await invoke("check_update")) as boolean;
      setSeasons(JSON.parse(m));
      setVersion(`v${v}`);
      setUpdateAvailable(u);
    }

    init();
  }, [setSeasons, setUpdateAvailable, setVersion]);

  return (
    <div className="pt-10">
      <Header />
      <div className="px-4 py-2">
        <AnimatePresence mode="wait">{options[stage]()}</AnimatePresence>
      </div>
    </div>
  );
}
