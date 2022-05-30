import { ReactNode } from "react";

export type Props = {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  bgColor?: string;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
  noHover?: boolean;
  children?: ReactNode;
};
function Button({ text, onClick, fontWeight, noHover, children }: Props) {
  return (
    <div
      className={`flex ${
        !noHover ? "hover:bg-gray-500" : "hover:underline"
      } px-4 h-8 cursor-pointer hover:text-white text-slate-100 bg-opacity-10 hover:bg-opacity-70 transition text-center select-none items-center ${fontWeight}`}
      onClick={onClick}
    >
      <h1 className="p-0 m-0 flex items-center text-center">{text}</h1>
      {children}
    </div>
  );
}
export default Button;
