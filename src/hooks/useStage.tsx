import { useAtom } from "jotai";
import { stage as state, StageType } from "../utils/state";

export default function useStage() {
  const [stageAtom, setStageAtom] = useAtom(state);

  function setStage(stage: StageType) {
    setStageAtom(stage);
  }

  return { stage: stageAtom, setStage };
}
