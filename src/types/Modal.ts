import { ReactNode } from "react";

type Modal = {
  title: string;
  message: string;
  state: boolean;
  children: ReactNode;
  type: "none" | "info" | "warning" | "error" | "question";
};

export default Modal;
