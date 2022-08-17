import { useContext, useEffect } from "react";
import { AppContext } from "../../components/Context";
import { State } from "../../utils/constants";

function Update() {
  const { update, setState } = useContext(AppContext);

  useEffect(() => {
    setState?.(State.UPDATING);
  });

  return (
    <div className="flex flex-col justify-between space-y-4">
      <div className="flex flex-col justify-between mt-8">
        <h1 className="font-bold text-3xl text-center">Cobaltic Updater</h1>
        <p className="text-center mb-3 text-gray-200">
          Already know the version you want? Enter it below.
        </p>
        <div className="mt-1 relative rounded-md shadow-sm flex space-x-2">
          Cobaltic {update?.version} is ready to be installed.
        </div>
      </div>
    </div>
  );
}

export default Update;
