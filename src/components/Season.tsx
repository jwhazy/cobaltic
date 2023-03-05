/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useAtom } from "jotai";
import useStage from "../hooks/useStage";
import { Season as SeasonType } from "../types/Season";
import { customManifest, selectedSeason } from "../utils/state";

const Season = ({
  banner,
  icon,
  manifests,
  seasonName,
  shortName,
  onClick,
}: SeasonType & { onClick?: () => void }) => {
  const [, setSeason] = useAtom(selectedSeason);
  const [, setCustomManifest] = useAtom(customManifest);

  const { setStage } = useStage();

  const onClickSeason = (): void => {
    if (onClick) return onClick();
    setCustomManifest(false);
    setSeason({ banner, icon, manifests, seasonName, shortName });
    setStage("options");
  };

  const c = shortName?.includes("c3")
    ? "Chapter 3"
    : shortName?.includes("c2")
    ? "Chapter 2"
    : shortName?.includes("c1")
    ? "Chapter 1"
    : "";

  const s = seasonName?.includes("Chapter")
    ? seasonName.replace(/C.*,/, "")
    : seasonName;

  return (
    <button
      className="relative flex w-max cursor-pointer overflow-clip rounded-xl drop-shadow-md"
      onClick={onClickSeason}
      type="button"
    >
      <div className=" overflow-none absolute flex h-full w-full select-none flex-col items-center justify-center text-center opacity-0 drop-shadow-md transition-all hover:bg-black/40 hover:opacity-100 md:p-6 md:py-3">
        <p className="tracking-widest  text-white ">{c?.toUpperCase()}</p>
        <h2 className=" text-white">{s}</h2>
      </div>
      <img
        src={`/${banner || "c1s1b.png"}`}
        width={420}
        className=" rounded-2xl"
        alt=""
      />
    </button>
  );
};

export default Season;
