/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useMemo, useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api";
import { UpdateManifest } from "@tauri-apps/api/updater";
import Modal from "../../types/Modal";
import Manifest from "../../types/Manifest";
import { State, Method } from "../../utils/constants";
import Season from "../../types/Season";
import log from "../../utils/logger";

interface DefaultContext {
  workers: string;
  setWorkers: (workers: string) => void;
  activeManifest?: Manifest;
  setActiveManifest?: (manifest: Manifest) => void;
  seasons?: Record<string, Season>;
  setSeasons?: (manifests: Record<string, Season>) => void;
  updateAvailable?: boolean;
  setUpdateAvailable?: (available: boolean) => void;
  update?: UpdateManifest;
  setUpdate?: (update: UpdateManifest) => void;
  directory?: string;
  setDirectory?: (directory: string) => void;
  manifests?: Manifest[];
  setManifests?: (season: Manifest[]) => void;
  state?: State;
  setState?: (state: State) => void;
  method?: Method;
  setMethod?: (method: Method) => void;
  modal: Modal;
  setModal: (modal: Modal) => void;
}

const AppContext = createContext<Partial<DefaultContext>>({});

type Props = {
  children: ReactNode;
};

function AppProvider({ children }: Props) {
  const [directory, setDirectory] = useState("");

  const [update, setUpdate] = useState<UpdateManifest>();

  const [workers, setWorkers] = useState("");

  const [manifests, setManifests] = useState<Manifest[]>([]);

  const [seasons, setSeasons] = useState<Record<string, Season>>();

  const [activeManifest, setActiveManifest] = useState<Manifest>();

  const [state, setState] = useState<State>(State.CHOOSING_SEASON);

  const [method, setMethod] = useState<Method>();

  const [updateAvailable, setUpdateAvailable] = useState(false);

  // This will be removed. This will use React Portal eventually.
  const [modal, setModal] = useState<Modal>();

  const value = useMemo(
    () => ({
      workers,
      setWorkers,
      activeManifest,
      setActiveManifest,
      update,
      setUpdate,
      manifests,
      setManifests,
      directory,
      setDirectory,
      seasons,
      setSeasons,
      state,
      setState,
      method,
      updateAvailable,
      setMethod,
      modal,
      setModal,
    }),
    [
      activeManifest,
      updateAvailable,
      directory,
      update,
      manifests,
      method,
      modal,
      seasons,
      state,
      workers,
    ]
  );

  useEffect(() => {
    invoke("get_manifests").then((m) => {
      setSeasons?.(JSON.parse(m as string) as Record<string, Season>);
      log("info", "Manifests fetched and set successfully.");
    });

    invoke("check_update").then((u) => setUpdateAvailable?.(u as boolean));

    // checkUpdate();

    // listen("tauri://update-available", (event) => {
    //   setUpdate(event.payload as UpdateManifest);
    // });
  }, [setSeasons]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
