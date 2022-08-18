import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { State } from "../../utils/constants";
import { AppContext } from "../../components/Context";

function Settings() {
  const navigate = useNavigate();
  const { setState } = useContext(AppContext);

  useEffect(() => {
    setState?.(State.CHOOSING_SEASON);
  });

  return (
    <div className="p-10">
      <div
        className="flex items-center space-x-2 text-gray-200 cursor-pointer mb-6"
        onClick={() => {
          setState?.(State.CHOOSING_SEASON);
          navigate("/");
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Go back</p>
      </div>
      <div className="flex items-center space-x-16">
        <div>
          <h1 className="font-black mb-2">Settings</h1>
        </div>
      </div>
    </div>
  );
}

export default Settings;
