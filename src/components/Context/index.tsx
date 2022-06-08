/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useMemo, useState } from "react";
import Modal from "../../types/Modal";
import Manifest from "../../types/Manifest";
import { State, Method } from "../../utils/constants";

interface DefaultContext {
  activeManifest?: Manifest;
  setActiveManifest?: (manifest: Manifest) => void;
  manifests?: Record<string, Manifest[]>;
  setManifests?: (manifests: Record<string, Manifest[]>) => void;
  directory?: string;
  setDirectory?: (directory: string) => void;
  season?: Manifest[];
  setSeason?: (season: Manifest[]) => void;
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

  const [manifests, setManifests] = useState<Record<string, Manifest[]>>({});

  const [season, setSeason] = useState<Manifest[]>();

  const [activeManifest, setActiveManifest] = useState<Manifest>();

  const [state, setState] = useState<State>(State.CHOOSING_SEASON);

  const [method, setMethod] = useState<Method>();

  const [modal, setModal] = useState<Modal>();

  const value = useMemo(
    () => ({
      activeManifest,
      setActiveManifest,
      manifests,
      setManifests,
      directory,
      setDirectory,
      season,
      setSeason,
      state,
      setState,
      method,
      setMethod,
      modal,
      setModal,
    }),
    [modal, method, state, activeManifest, season, manifests, directory]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
