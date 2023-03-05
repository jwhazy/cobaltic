/* eslint-disable import/no-extraneous-dependencies */
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function clsxm(...classes: ClassValue[]) {
  return twMerge(clsx(...classes));
}
