import { useContext, useEffect } from "react";
import { AppContext } from "../../components/Context";
import { newManifests, State } from "../../utils/constants";
import ChooseManifest from "./ChooseManifest";
import ChooseSeason from "./ChooseSeason";
import Download from "./Download";
import Finalize from "./Finalize";

function Home() {
  const { state, setSeasons } = useContext(AppContext);

  useEffect(() => {
    setSeasons?.(newManifests);
  }, [setSeasons]);

  return (
    <div className="space-y-8">
      <div className="animate__animated animate__fadeInUp">
        <div className="px-32 space-y-8" id="mods">
          {state === State.CHOOSING_SEASON ? <ChooseSeason /> : null}
          {state === State.CHOOSING_MANIFEST ? <ChooseManifest /> : null}
          {state === State.FINALIZING ? <Finalize /> : null}
          {state === State.DOWNLOADING || state === State.LOADING ? (
            <Download />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
