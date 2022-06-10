import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../components/Context";
import { State } from "../../utils/constants";

function NotFound() {
  const { setState } = useContext(AppContext);

  return (
    <div className="p-10">
      <div
        className="flex items-center space-x-2 text-gray-200 cursor-pointer mb-6"
        onClick={() => {
          setState?.(State.CHOOSING_SEASON);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Go back</p>
      </div>
      <div className="flex items-center space-x-16">
        <div>
          <h1 className="font-black mb-2">OH NO! AN ERROR OCCURRED</h1>
          <h3>404</h3>
          <p>Go back using the button above.</p>
          <p className="italic text-gray-400">
            You shouldn&apos;t be here... 🤔
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
