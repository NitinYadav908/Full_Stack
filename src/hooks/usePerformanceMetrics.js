import {
  useMemo,
} from "react";

import {
  calculateRenderDelta,
  calculateTotalRenders,
  calculateWorkUnits,
} from "../utils/performance";

import { usePerformanceContext } from "../context/PerformanceContext";

export default function usePerformanceMetrics(
  postsCount
) {
  const {
    metrics,
    optimized,
    revision,
  } = usePerformanceContext();

  return useMemo(
    () => {
      const postRenders =
        metrics.renders.PostCard || 0;

      const work = calculateWorkUnits({
        postsCount,
        postRenders,
        calculations: metrics.calculations,
        callbackCreations:
          metrics.callbackCreations,
        optimized,
      });

      const renderDeltas = {};

      Object.keys(metrics.renders).forEach(
        (component) => {
          renderDeltas[component] =
            calculateRenderDelta(
              metrics,
              component
            );
        }
      );

      return {
        ...metrics,
        totalRenders:
          calculateTotalRenders(metrics),
        work,
        renderDeltas,
        revision,
      };
    },
    [
      metrics,
      postsCount,
      optimized,
      revision,
    ]
  );
}