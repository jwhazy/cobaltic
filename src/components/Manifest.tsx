import { useAtom } from "jotai";
import { Check } from "lucide-react";
import { Manifest as ManifestType } from "../types/Manifest";
import clsxm from "../utils/clsxm";
import { selectedManifest as selectedManifestAtom } from "../utils/state";

const Manifest = ({ name, icon, version, id, url }: ManifestType) => {
  const [selectedManifest, setSelectedManifest] = useAtom(selectedManifestAtom);

  const onClick = () => {
    if (selectedManifest?.id !== id) {
      setSelectedManifest({ id, name, icon, version, url });
    } else {
      setSelectedManifest(undefined);
    }
  };

  return (
    <button
      className={clsxm(
        "mt-2 flex w-full  cursor-pointer items-center justify-between rounded-xl p-4 transition-all hover:bg-black/30",
        selectedManifest?.id === id && "bg-black/30"
      )}
      type="button"
      onClick={onClick}
    >
      <div className="flex space-x-4">
        <img
          src={`/${icon || "c1s1p.jpg"}`}
          height={48}
          width={48}
          className="h-16 w-16 rounded-xl"
          alt=""
        />
        <div className="text-left">
          <h3>{name}</h3>
          <p className="text-truncate w-2/3">{version}</p>
        </div>
      </div>
      {selectedManifest?.id === id && (
        <div className="flex">
          <Check />
        </div>
      )}
    </button>
  );
};
export default Manifest;
