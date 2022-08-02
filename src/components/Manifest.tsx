import fortnite from "../public/c2s2p.jpg";

export type Props = {
  title: string;
  subtitle: string;
  icon: string;
  banner: string;
  onClick?: () => void;
};

function ManifestItem({ title, subtitle, onClick, icon }: Props) {
  return (
    <div
      className="ml-2 m-5 w-[512px] cursor-pointer border bg-opacity-10 hover:bg-opacity-25 bg-black text-white transition border-gray-700 placeholder-gray-400 hover:outline-none hover:ring-1 hover:ring-gray-300 hover:ring-opacity-50 shadow-sm disabled:text-gray-500 mt-1 flex items-center rounded-3xl"
      onClick={onClick}
    >
      <img
        src={`/src/public/${icon}` || fortnite}
        height={96}
        width={96}
        className="rounded-l-3xl"
        alt=""
      />
      <div className="pt-4 drop-shadow-md md:p-6 md:py-3">
        <h3>{title}</h3>
        <p className="text-gray-200">{subtitle}</p>
      </div>
    </div>
  );
}
export default ManifestItem;
