import { invoke } from "@tauri-apps/api";
import { useContext, useEffect } from "react";
import { AppContext } from "../../components/Context";
import Season from "../../types/Season";
import { State } from "../../utils/constants";
import ChooseManifest from "../manifest";
import ChooseSeason from "../season";
import Download from "../download";
import Finalize from "../finalize";

function Home() {
  const { state, setSeasons } = useContext(AppContext);

  useEffect(() => {
    invoke("get_manifests").then((m) => {
      setSeasons?.(JSON.parse(m as string) as Record<string, Season>);
    });
  }, [setSeasons]);

  return (
    <div className="animate__animated animate__fadeInUp px-32" id="home">
      {state === State.CHOOSING_SEASON ? <ChooseSeason /> : null}
      {state === State.CHOOSING_MANIFEST ? <ChooseManifest /> : null}
      {state === State.FINALIZING ? <Finalize /> : null}
      {state === State.DOWNLOADING || state === State.LOADING ? (
        <Download />
      ) : null}
    </div>
  );
}

export default Home;
