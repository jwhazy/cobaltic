import Manifest from "./Manifest";

type Season = {
  shortName?: string;
  seasonName?: string;
  icon?: string;
  banner?: string;
  manifests: Manifest[];
};

export default Season;
