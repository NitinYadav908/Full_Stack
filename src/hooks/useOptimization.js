import {
  useCallback,
  useMemo,
} from "react";

import { usePerformanceContext } from "../context/PerformanceContext";

export default function useOptimization() {
  const {
    useMemoOn,
    useCallbackOn,
    reactMemoOn,
    optimized,
    markCalculation,
    markCallbackCreation,
  } = usePerformanceContext();

  const memoize = (factory, dependencies) => {
    const result = useMemo(
      () => {
        if (useMemoOn) {
          return factory();
        }

        markCalculation();
        return factory();
      },
      useMemoOn
        ? dependencies
        : [...dependencies, markCalculation]
    );

    return result;
  };

  const createStableCallback = (
    callback,
    dependencies
  ) => {
    const result = useCallback(
      (...args) => callback(...args),
      useCallbackOn
        ? dependencies
        : [...dependencies, Symbol("unstable")]
    );

    if (!useCallbackOn) {
      markCallbackCreation();
    }

    return result;
  };

  return {
    useMemoOn,
    useCallbackOn,
    reactMemoOn,
    optimized,
    memoize,
    createStableCallback,
  };
}