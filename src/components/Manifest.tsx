/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */

import fortnite from "../assets/images/fortnite.png";

export type Props = {
  title: string;
  subtitle: string;
  onClick?: () => void;
};

export default function Manifest({ title, subtitle, onClick }: Props) {
  return (
    <div
      className="ml-2 py-4 w-max px-3 cursor-pointer border bg-opacity-10 hover:bg-opacity-25 bg-black text-white transition border-gray-700 placeholder-gray-400 hover:outline-none hover:ring-1 hover:ring-gray-300 hover:ring-opacity-50 shadow-sm disabled:text-gray-500 mt-1 flex items-center rounded-3xl"
      onClick={onClick}
    >
      <img src={fortnite} height={96} width={96} className="rounded-3xl" />
      <div className="pt-4 drop-shadow-md md:p-6 md:py-3">
        <h3>{title}</h3>
        <p className="text-gray-200">{subtitle}</p>
      </div>
    </div>
  );
}
