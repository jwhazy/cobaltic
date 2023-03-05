import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { shell } from "@tauri-apps/api";
import Season from "../components/Season";
import { customManifest, seasons as seasonsAtom } from "../utils/state";
import { Button } from "../components/ui/Button";
import useStage from "../hooks/useStage";
import { Input } from "../components/ui/Input";

const Home = () => {
  const { setStage } = useStage();
  const [, setCustomManifest] = useAtom(customManifest);

  const [input, setInput] = useState("");

  const handleCustomManifest = () => {
    setCustomManifest(input);
    setStage("options");
  };

  const [seasons] = useAtom(seasonsAtom);
  return (
    <motion.div
      className="flex h-full w-full flex-col items-center justify-center space-y-4 pt-4 pb-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "anticipate" }}
    >
      <div>
        <h2>Use a specific manifest</h2>
        <p>Already know the manifest you want? Enter it below.</p>
      </div>
      <div className="flex w-2/3 space-x-2">
        <Input
          onChange={(e) => setInput(e.target.value)}
          placeholder="Manifest identifier"
        />
        <Button variant="outline" onClick={handleCustomManifest}>
          <ArrowRight />
        </Button>
      </div>
      <p>or</p>
      <div>
        <h2>Choose a season</h2>
        <p>Already know the manifest you want? Enter it below.</p>
        <div className="flex w-[95vw] flex-grow-0 flex-row flex-wrap justify-center gap-4 pt-6">
          {Object.keys(seasons).map((m) => (
            <Season {...seasons[m]} key={m} />
          ))}
          <Season
            icon="fortniteb.png"
            seasonName="Other Builds"
            shortName="Other"
            manifests={[]}
            onClick={() =>
              shell.open("https://github.com/notsamicc/Fortnite-Builds")
            }
            banner="fortniteb.png"
            key="other"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
