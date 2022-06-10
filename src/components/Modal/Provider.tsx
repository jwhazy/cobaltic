import { useContext } from "react";
import { AppContext } from "../Context";
import ModalComponent from ".";

function ModalProvider() {
  const { modal } = useContext(AppContext);

  if (modal?.state) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ModalComponent {...modal} />;
  }
  return null;
}

export default ModalProvider;
