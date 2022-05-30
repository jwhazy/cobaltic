import clsxm from "../utils/clsxm";

type Props = {
  className?: string;
};

function Spinner({ className }: Props) {
  const addClasses = clsxm("spinner m-[100px] ml-auto mr-auto", className);
  return <div className={addClasses} />;
}

export default Spinner;
