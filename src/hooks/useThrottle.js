import { useMemo } from "react";
import throttle from "../utils/throttle";

function useThrottle(cb, coolDown) {
  return useMemo(() => throttle(cb, coolDown), [cb, coolDown]);
}

export default useThrottle;
