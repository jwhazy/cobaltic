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
      <div className="flex flex-col w-screen bg-black h-48 justify-center bg-opacity-25 py-8 animate__animated animate__fadeIn text-center">
        <div className=" animate__animated animate__fadeInDown">
          {state === State.CHOOSING_SEASON ||
          State.CHOOSING_MANIFEST ||
          State.FINALIZING ? (
            <h1 className="font-black text-5xl text-gray-200">
              WELCOME TO <a className="text-white">COBALTIC</a>
            </h1>
          ) : (
            "Choose a season"
          )}

          <p className="text-center text-gray-200">
            Easy to use Fortnite manifest downloader.
          </p>
        </div>
      </div>

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
