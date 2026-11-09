import React from "react";

import {
  usePerformanceContext,
} from "../context/PerformanceContext";

import usePerformanceMetrics from "../hooks/usePerformanceMetrics";

export default function OptimizationSummary({
  postsCount,
}) {
  const {
    optimized,
    useMemoOn,
    useCallbackOn,
    reactMemoOn,
    metrics,
  } = usePerformanceContext();

  const performance =
    usePerformanceMetrics(
      postsCount
    );

  const postRenders =
    performance.renders.PostCard || 0;

  const calculations =
    metrics.calculations || 0;

  const callbacks =
    metrics.callbackCreations || 0;

  const optimizedWork =
    performance.work;

  const baseline =
    Math.max(
      postsCount * 3,
      postRenders +
        calculations +
        callbacks +
        metrics.postChanges *
          Math.max(postsCount, 1)
    );

  const saved = Math.max(
    0,
    baseline - optimizedWork
  );

  const currentPercentage =
    baseline > 0
      ? Math.min(
          100,
          (optimizedWork /
            baseline) *
            100
        )
      : 0;

  return (
    <section className="panel comparison">
      <div className="panel-head compact">
        <div>
          <span className="section-kicker">
            COMPARISON
          </span>

          <h3>
            Work count
          </h3>
        </div>
      </div>

      <div className="mode-banner">
        <span>
          Benchmark mode
        </span>

        <b>
          {optimized
            ? "OPTIMIZED"
            : "NON-OPTIMIZED"}
        </b>
      </div>

      <div className="compare-row">
        <span>
          Non-optimized baseline
        </span>

        <b>
          {baseline}
        </b>
      </div>

      <div className="bar">
        <i
          style={{
            width: "100%",
          }}
        />
      </div>

      <div className="compare-row">
        <span>
          Current setup
        </span>

        <b>
          {optimizedWork}
        </b>
      </div>

      <div className="bar current">
        <i
          style={{
            width: `${currentPercentage}%`,
          }}
        />
      </div>

      <div className="saving">
        <strong>
          {saved}
        </strong>

        <span>
          estimated work units avoided
        </span>
      </div>

      <div className="optimization-flags">
        <span>
          useMemo{" "}
          <b>
            {useMemoOn
              ? "ON"
              : "OFF"}
          </b>
        </span>

        <span>
          useCallback{" "}
          <b>
            {useCallbackOn
              ? "ON"
              : "OFF"}
          </b>
        </span>

        <span>
          React.memo{" "}
          <b>
            {reactMemoOn
              ? "ON"
              : "OFF"}
          </b>
        </span>
      </div>
    </section>
  );
}