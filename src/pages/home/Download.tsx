/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../components/Context";
import State from "../../types/State";
import { Method } from "../../utils/constants";

export default function Download() {
  const { directory, method, activeManifest } = useContext(AppContext);

  const [state, setState] = useState<State>();

  useEffect(() => {
    setState({
      title: `Downloading ${activeManifest?.name || activeManifest?.id}`,
      subtitle: `Launching Splash now. Come back to Cobaltic when Splash closes.`,
      percent: 45,
    });
  }, [activeManifest?.name, activeManifest?.id]);

  if (method === Method.SPLASH) {
    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col justify-center items-center space-y-8">
          <div>
            <h1 className="font-bold text-3xl text-center">{state?.title}</h1>
            <p className="text-center mb-3 text-gray-200">{state?.subtitle}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${state?.percent}%` }}
              />
            </div>
          </div>

          <div>
            <h1 className="font-bold text-3xl text-center">
              Extra information
            </h1>
            <p className="text-center mb-3 text-gray-200">
              {method}, {directory}, {activeManifest?.id}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <p>Directory: {directory}</p>
      <p>Method: {method}</p>
      <p>Manifest id: {activeManifest?.id}</p>
    </div>
  );
}
