import { useContext } from "react";
import { State } from "../utils/constants";
import { AppContext } from "./Context";

function Header() {
  const { state } = useContext(AppContext);
  return (
    <div className="flex flex-col w-screen bg-black h-48 justify-center bg-opacity-25 py-8 animate__animated animate__fadeIn z-30 text-center mb-8">
      <div className=" animate__animated animate__fadeInDown">
        {state === State.CHOOSING_SEASON ||
        State.CHOOSING_MANIFEST ||
        State.FINALIZING ? (
          <h1 className="font-black text-5xl text-gray-200">
            WELCOME TO <a className="text-white">COBALTIC</a>
          </h1>
        ) : (
          "Choose a season"
        )}

        <p className="text-center text-gray-200">
          Easy to use Fortnite manifest downloader.
        </p>
      </div>
    </div>
  );
}

export default Header;
