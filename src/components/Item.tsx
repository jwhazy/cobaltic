/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";

export type DefaultProps = {
  text?: string;
  onClick?: () => void;
  fontWeight?: string;
  noHover?: boolean;
  children?: React.ReactNode;
};
export default function Item({
  text,
  onClick,
  fontWeight,
  noHover,
  children,
}: DefaultProps) {
  return (
    <div
      className={`flex ${
        !noHover ? "hover:bg-gray-500" : "hover:underline"
      } px-4 h-8 cursor-pointer hover:text-white text-slate-100 bg-opacity-10 hover:bg-opacity-70 transition text-center select-none items-center ${fontWeight}`}
      onClick={onClick}
    >
      <p className="p-0 m-0 flex items-center text-center">{text}</p>
      {children}
    </div>
  );
}
