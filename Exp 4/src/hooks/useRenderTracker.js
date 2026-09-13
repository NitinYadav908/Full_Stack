import { useRef } from "react";

import { usePerformanceContext } from "../context/PerformanceContext";

export default function useRenderTracker(componentName) {
  const renderCount = useRef(0);

  const {
    markRender,
  } = usePerformanceContext();

  renderCount.current += 1;

  markRender(componentName);

  return renderCount.current;
}