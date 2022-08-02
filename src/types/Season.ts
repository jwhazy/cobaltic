import Manifest from "./Manifest";

export type Season = {
  banner: string;
  icon: string;
  manifests: Manifest[];
  seasonName: string;
  shortName: string;
};

export default Season;
