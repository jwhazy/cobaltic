import { ReactNode } from "react";
import clsxm from "../utils/clsxm";

import Spinner from "./Spinner";

export type Props = {
  text?: string;
  alt?: string;
  onClick?: () => void;
  disabled?: boolean;
  bgColor?: string;
  bgColorHover?: string;
  color?: string;
  colorHover?: string;
  fontSize?: string;
  fontWeight?: string;
  showBackground?: boolean;
  opacity?: string;
  opacityHover?: string;
  newTab?: boolean;
  className?: string;
  children?: ReactNode;
};

function Button(props: Props) {
  const className = clsxm(
    "py-2 px-3 border bg-opacity-10 hover:bg-opacity-25 bg-black text-white transition border-gray-700 placeholder-gray-400 hover:outline-none hover:ring-1 hover:ring-gray-300 hover:ring-opacity-50 shadow-sm disabled:text-gray-500 mt-1 block rounded-l-md rounded-md",
    props.className
  );

  return (
    <button type="button" className={className} onClick={props.onClick}>
      {props.text || props.children || <Spinner />}
    </button>
  );
}
export default Button;
