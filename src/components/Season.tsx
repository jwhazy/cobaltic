import log from "../utils/logger";

export type Props = {
  season: string;
  chapter?: string;
  icon: string;
  banner: string;

  onClick?: () => void;
};

function SeasonItem({ season, chapter, onClick, banner }: Props) {
  return (
    <div
      className="ml-2 flex-col m-3 w-max cursor-pointer border bg-opacity-10 hover:bg-opacity-25 bg-black text-white transition border-gray-700 placeholder-gray-400 hover:outline-none hover:ring-1 hover:ring-gray-300 hover:ring-opacity-50 shadow-sm disabled:text-gray-500 mt-1 flex items-center rounded-3xl"
      onClick={() => {
        log("info", `${chapter} ${season} selected.`);
        onClick?.();
      }}
    >
      <img
        src={`/${banner || "c1s1b.png"}`}
        width={512}
        className="rounded-t-3xl"
        alt=""
      />
      <div className="pt-4 drop-shadow-md md:p-6 md:py-3 text-center">
        <p className="text-gray-200 tracking-widest">
          {chapter?.toUpperCase()}
        </p>
        <h2>{season}</h2>
      </div>
    </div>
  );
}
export default SeasonItem;
