import React, {
  memo,
} from "react";

import {
  usePerformanceContext,
} from "../context/PerformanceContext";

import usePerformanceMetrics from "../hooks/usePerformanceMetrics";

import MetricCard from "./MetricCard";

function PerformanceRow({
  label,
  value,
  detail,
  tone,
}) {
  return (
    <div className="metric-row">
      <div>
        <b>{label}</b>

        <span>{detail}</span>
      </div>

      <strong className={tone || ""}>
        {value}
      </strong>
    </div>
  );
}

function PerformanceInspector({
  postsCount,
}) {
  const {
    optimized,
    useCallbackOn,
    metrics,
  } = usePerformanceContext();

  const performance =
    usePerformanceMetrics(
      postsCount
    );

  const postRenders =
    performance.renders.PostCard || 0;

  const work =
    performance.work;

  const avoided =
    optimized
      ? Math.max(
          0,
          postsCount *
            Math.max(
              1,
              metrics.postChanges
            ) -
            postRenders
        )
      : 0;

  return (
    <>
      <section className="metrics-grid">
        <MetricCard
          label="App renders"
          value={
            performance.renders.App
          }
          hint="component render count"
          accent="purple"
        />

        <MetricCard
          label="React commits"
          value={metrics.commits}
          hint="Profiler commit count"
          accent="blue"
        />

        <MetricCard
          label="Derived calculations"
          value={
            metrics.calculations
          }
          hint="calendar grouping"
          accent="green"
        />

        <MetricCard
          label="Post changes"
          value={
            metrics.postChanges
          }
          hint="create / move operations"
          accent="orange"
        />

        <MetricCard
          label="Drag starts"
          value={
            metrics.dragStarts
          }
          hint="drag interactions"
          accent="pink"
        />

        <MetricCard
          label="Drag drops"
          value={
            metrics.dragDrops
          }
          hint="successful drops"
          accent="cyan"
        />
      </section>

      <section className="panel performance">
        <div className="panel-head compact">
          <div>
            <span className="section-kicker">
              LIVE PERFORMANCE
            </span>

            <h3>
              Inspector output
            </h3>
          </div>

          <span className="pulse">
            ●
          </span>
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

        <PerformanceRow
          label="Estimated work units"
          value={work}
          detail="count-based model"
          tone="good"
        />

        <PerformanceRow
          label="Memoization hits"
          value={
            metrics.memoHits
          }
          detail="optimized render paths"
        />

        <PerformanceRow
          label="Post render calls"
          value={postRenders}
          detail="actual PostCard executions"
        />

        <PerformanceRow
          label="Callback operations"
          value={
            useCallbackOn
              ? metrics.commits + 1
              : metrics.commits * 2 + 1
          }
          detail={
            useCallbackOn
              ? "stable path"
              : "recreated path"
          }
        />

        <PerformanceRow
          label="Avoided work"
          value={avoided}
          detail="estimated units vs current baseline"
          tone="good"
        />
      </section>
    </>
  );
}

export default memo(
  PerformanceInspector
);