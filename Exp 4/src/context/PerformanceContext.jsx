import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  cloneRenderCounts,
  createInitialMetrics,
} from "../utils/performance";

const PerformanceContext = createContext(null);

export function PerformanceProvider({ children }) {
  const metricsRef = useRef(createInitialMetrics());

  const [useMemoOn, setUseMemoOn] = useState(true);
  const [useCallbackOn, setUseCallbackOn] = useState(true);
  const [reactMemoOn, setReactMemoOn] = useState(true);

  const [revision, setRevision] = useState(0);

  const refresh = useCallback(() => {
    setRevision((value) => value + 1);
  }, []);

  const markRender = useCallback((component) => {
    const metrics = metricsRef.current;

    if (typeof metrics.renders[component] !== "number") {
      metrics.renders[component] = 0;
    }

    metrics.renders[component] += 1;
  }, []);

  const markCalculation = useCallback(() => {
    metricsRef.current.calculations += 1;
  }, []);

  const markCallbackCreation = useCallback(() => {
    metricsRef.current.callbackCreations += 1;
  }, []);

  const markDragStart = useCallback(() => {
    metricsRef.current.dragStarts += 1;
  }, []);

  const markDragDrop = useCallback(() => {
    metricsRef.current.dragDrops += 1;
  }, []);

  const markPostChange = useCallback(() => {
    metricsRef.current.postChanges += 1;
  }, []);

  const markMemoHit = useCallback(() => {
    metricsRef.current.memoHits += 1;
  }, []);

  const markCommit = useCallback(() => {
    metricsRef.current.commits += 1;
  }, []);

  const beginInteraction = useCallback(
    (label) => {
      const metrics = metricsRef.current;

      metrics.lastInteraction = {
        label,
        before: cloneRenderCounts(metrics),
      };

      metrics.lastAction = label;

      refresh();
    },
    [refresh]
  );

  const setLastAction = useCallback(
    (label) => {
      metricsRef.current.lastAction = label;
      refresh();
    },
    [refresh]
  );

  const resetMetrics = useCallback(() => {
    metricsRef.current = createInitialMetrics();
    refresh();
  }, [refresh]);

  const toggleMemo = useCallback(() => {
    setUseMemoOn((value) => !value);
    refresh();
  }, [refresh]);

  const toggleCallback = useCallback(() => {
    setUseCallbackOn((value) => !value);
    refresh();
  }, [refresh]);

  const toggleReactMemo = useCallback(() => {
    setReactMemoOn((value) => !value);
    refresh();
  }, [refresh]);

  const optimized =
    useMemoOn &&
    useCallbackOn &&
    reactMemoOn;

  const value = useMemo(
    () => ({
      metrics: metricsRef.current,

      revision,

      useMemoOn,
      useCallbackOn,
      reactMemoOn,

      optimized,

      markRender,
      markCalculation,
      markCallbackCreation,
      markDragStart,
      markDragDrop,
      markPostChange,
      markMemoHit,
      markCommit,

      beginInteraction,
      setLastAction,
      resetMetrics,

      toggleMemo,
      toggleCallback,
      toggleReactMemo,
    }),
    [
      revision,
      useMemoOn,
      useCallbackOn,
      reactMemoOn,
      optimized,
      markRender,
      markCalculation,
      markCallbackCreation,
      markDragStart,
      markDragDrop,
      markPostChange,
      markMemoHit,
      markCommit,
      beginInteraction,
      setLastAction,
      resetMetrics,
      toggleMemo,
      toggleCallback,
      toggleReactMemo,
    ]
  );

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceContext() {
  const context = useContext(PerformanceContext);

  if (!context) {
    throw new Error(
      "usePerformanceContext must be used inside PerformanceProvider"
    );
  }

  return context;
}