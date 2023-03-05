import * as React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import clsxm from "../../utils/clsxm";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Tab = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, ...props }, ref) => {
    return (
      <button
        className={clsxm(
          "inline-flex h-8 items-center justify-center rounded-md bg-transparent py-2 px-2 text-sm font-medium transition-colors hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-200/10 dark:hover:text-slate-100 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:bg-transparent",
          className
        )}
        type="button"
        ref={ref}
        {...props}
      />
    );
  }
);
Tab.displayName = "Button";

export { Tab };
