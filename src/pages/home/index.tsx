import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { shell } from "@tauri-apps/api";
import { useNavigate } from "react-router-dom";
import { State } from "../../utils/constants";
import { AppContext } from "../../components/Context";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spinner from "../../components/Spinner";
import SeasonItem from "../../components/Season";

function Home() {
  const {
    seasons,
    activeManifest,
    setActiveManifest,
    setManifests,
    setState,
    setModal,
  } = useContext(AppContext);

  useEffect(() => {
    setState?.(State.CHOOSING_SEASON);
  });
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between space-y-4">
      <div className="flex flex-col justify-between mt-8">
        <h1 className="font-bold text-3xl text-center">
          Use a specific manifest
        </h1>
        <p className="text-center mb-3 text-gray-200">
          Already know the version you want? Enter it below.
        </p>
        <div className="mt-1 relative rounded-md shadow-sm flex space-x-2">
          <Input
            onChange={(e) => {
              setActiveManifest?.({
                id: e.target.value,
                url: `https://raw.githubusercontent.com/VastBlast/FortniteManifestArchive/main/Fortnite/Windows/${e.target.value}.manifest`,
              });
            }}
            value={activeManifest?.id}
            placeholder="Manifest identifer"
          />
          <Button
            onClick={() => {
              try {
                if (!activeManifest) throw new Error("No manifest id");
                setState?.(State.FINALIZING);
                navigate("/finalize");
              } catch (e: any) {
                setModal?.({
                  title: "ERROR",
                  message: (e as Error).message,
                  state: true,
                  children: undefined,
                  type: "error",
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </div>
      <p className="text-center text-gray-300">or</p>
      <div>
        <h1 className="font-bold text-3xl text-center">Choose a season</h1>
        <p className="text-center mb-3 text-gray-200">
          Choose a season to install from the list below.
        </p>
        <div className="flex flex-row flex-wrap flex-grow-0 align-center justify-center">
          {seasons ? (
            Object.keys(seasons).map((season) => {
              const { shortName, icon, seasonName, banner, manifests } =
                seasons[season];

              // eslint-disable-next-line no-nested-ternary
              const c = shortName?.includes("c3")
                ? "Chapter 3"
                : shortName?.includes("c2")
                ? "Chapter 2"
                : "Chapter 1";

              const s = seasonName?.includes("Chapter")
                ? seasonName.replace(/C.*,/, "")
                : seasonName;

              return (
                <SeasonItem
                  key={shortName}
                  icon={icon || "fortniteb.png"}
                  season={s || "null"}
                  chapter={c}
                  banner={banner || "fortniteb.png"}
                  onClick={() => {
                    setManifests?.(manifests);
                    setState?.(State.CHOOSING_MANIFEST);
                    navigate("/manifest");
                  }}
                />
              );
            })
          ) : (
            <Spinner />
          )}
          {seasons ? (
            <SeasonItem
              key={null}
              icon="fortniteb.png"
              season="Other Builds"
              banner="fortniteb.png"
              onClick={() => {
                shell.open("https://github.com/notsamicc/Fortnite-Builds");
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
