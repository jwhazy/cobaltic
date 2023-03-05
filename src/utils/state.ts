import { atom } from "jotai";
import { Manifest } from "../types/Manifest";
import { Season } from "../types/Season";

export type StageType = keyof typeof stageOptions;

export const stageOptions = {
  home: "home",
  options: "options",
  download: "download",
};

// eslint-disable-next-line import/prefer-default-export
export const stage = atom<StageType>("home");

export const seasons = atom<Record<string, Season>>({});

export const version = atom<string>("v2.0.0");
export const updateAvailable = atom<boolean>(false);

export const selectedSeason = atom<Season | undefined>(undefined);
export const selectedManifest = atom<Manifest | undefined>(undefined);

export const directory = atom<string | undefined>(undefined);

export const customManifest = atom<string | false>(false);
