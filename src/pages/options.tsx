import { dialog } from "@tauri-apps/api";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Manifest from "../components/Manifest";
import { Button } from "../components/ui/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/Collapsible";
import { Input } from "../components/ui/Input";
import useStage from "../hooks/useStage";
import {
  directory as directoryAtom,
  selectedSeason,
  customManifest as customManifestAtom,
  selectedManifest as selectedManifestAtom,
} from "../utils/state";

const Options = () => {
  const [season] = useAtom(selectedSeason);
  const [customManifest] = useAtom(customManifestAtom);
  const [selectedManifest] = useAtom(selectedManifestAtom);

  const [directory, setDirectory] = useAtom(directoryAtom);

  const handleFolderPicker = async () => {
    setDirectory(
      (await dialog.open({
        directory: true,
        multiple: false,
        defaultPath: "%userprofile%",
        title: "Select a download directory",
      })) as string
    );
  };
  const { setStage } = useStage();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!season && !customManifest) {
      setStage("home");
      toast("Please select a season.");
    }
  }, [season, customManifest, setStage]);

  const handleDownload = () => {
    setStage("download");
  };

  return (
    <motion.div
      className=" grid h-full w-full grid-cols-2 space-x-4 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "anticipate" }}
    >
      {!customManifest ? (
        <table>
          <tr>
            <div className="pl-4 pb-2">
              <h3>Available manifests</h3>
              <p>Missing something? It may not be available as as manifest.</p>
            </div>
          </tr>

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            {season?.manifests.slice(0, 3).map((m) => (
              <tr key={m.id}>
                <Manifest {...m} />
              </tr>
            ))}
            <CollapsibleContent>
              {season?.manifests.slice(3).map((m) => (
                <tr key={m.id}>
                  <Manifest {...m} />
                </tr>
              ))}
            </CollapsibleContent>
            {season?.manifests?.length
              ? season?.manifests?.length >= 3 && (
                  <tr>
                    <CollapsibleTrigger>
                      <Button variant="outline" className="ml-4 mt-4">
                        Show {isOpen ? "less" : "more"}
                      </Button>
                    </CollapsibleTrigger>
                  </tr>
                )
              : null}
          </Collapsible>
        </table>
      ) : (
        <tr>
          <div className="pl-4 pb-2">
            <h3>Custom manifest selected</h3>
            <p>Manifest {customManifest} has been selected.</p>
          </div>
        </tr>
      )}

      <div className="w-full space-y-2">
        <div>
          <h3>Download options</h3>
          <p>Configure your download options</p>
        </div>
        <div className="space-y-2">
          <div>
            <h4>Download directory</h4>
            <p>Paste a directory or use the folder picker</p>
          </div>
          <div className="mr-8 flex space-x-2">
            <Input
              placeholder="Download directory"
              onChange={(e) => setDirectory(e.target.value)}
              value={directory}
            />
            <Button variant="outline" onClick={handleFolderPicker}>
              ...
            </Button>
          </div>
        </div>
        <div className="pt-8">
          {(customManifest || selectedManifest) && directory ? (
            <Button variant="outline" onClick={handleDownload}>
              Download
            </Button>
          ) : (
            <h4>Select a manifest to continue</h4>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Options;
