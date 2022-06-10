import { ChangeEvent } from "react";

type Props = {
  placeholder: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (_e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

function Input({ placeholder, onChange, className, value }: Props) {
  return (
    <input
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      className={`py-2 px-3 border bg-opacity-10 focus:bg-opacity-25 bg-black text-white transition border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-opacity-50 shadow-sm disabled:text-gray-500 mt-1 block w-full rounded-l-md rounded-md ${className}`}
    />
  );
}

export default Input;
