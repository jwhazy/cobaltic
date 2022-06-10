import Manifest from "./Manifest";

type Season = {
  short_name?: string;
  season_name?: string;
  icon?: string;
  banner?: string;
  manifests: Manifest[];
};

export default Season;
