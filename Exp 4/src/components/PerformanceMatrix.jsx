import React, {
  memo,
} from "react";

import {
  usePerformanceContext,
} from "../context/PerformanceContext";

import usePerformanceMetrics from "../hooks/usePerformanceMetrics";

import useRenderTracker from "../hooks/useRenderTracker";

function PerformanceMatrix({
  postsCount,
}) {
  useRenderTracker(
    "PerformanceMatrix"
  );

  const {
    metrics,
    optimized,
  } = usePerformanceContext();

  const performance =
    usePerformanceMetrics(
      postsCount
    );

  const components = [
    "App",
    "CalendarView",
    "CalendarEvent",
    "PostCard",
    "PerformanceInspector",
    "PerformanceMatrix",
  ];

  return (
    <section className="panel performance-matrix-panel">
      <div className="panel-head">
        <div>
          <span className="section-kicker">
            RENDER PERFORMANCE MATRIX
          </span>

          <h3>
            Live component render analysis
          </h3>
        </div>

        <span className="pulse">
          ● LIVE
        </span>
      </div>

      <div className="matrix-status">
        <span>
          Last interaction
        </span>

        <strong>
          {metrics.lastInteraction?.label ||
            "Initial render"}
        </strong>
      </div>

      <div className="performance-table-wrap">
        <table className="performance-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Total renders</th>
              <th>After last action</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {components.map(
              (component) => {
                const total =
                  performance.renders[
                    component
                  ] || 0;

                const delta =
                  performance.renderDeltas[
                    component
                  ] || 0;

                const isPost =
                  component ===
                  "PostCard";

                let status =
                  "Observed";

                if (
                  optimized &&
                  isPost &&
                  delta === 0
                ) {
                  status = "Skipped";
                }

                if (delta > 0) {
                  status =
                    optimized &&
                    isPost
                      ? "Updated"
                      : "Re-rendered";
                }

                return (
                  <tr key={component}>
                    <td>
                      <strong>
                        {component}
                      </strong>
                    </td>

                    <td>
                      <span className="matrix-number">
                        {total}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          delta > 0
                            ? "matrix-delta changed"
                            : "matrix-delta"
                        }
                      >
                        +{delta}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`matrix-status ${status
                          .toLowerCase()
                          .replace(
                            " ",
                            "-"
                          )}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      <div className="matrix-footer">
        <span>
          Total tracked renders:
          <strong>
            {" "}
            {performance.totalRenders}
          </strong>
        </span>

        <span>
          Current mode:
          <strong>
            {" "}
            {optimized
              ? "OPTIMIZED"
              : "NON-OPTIMIZED"}
          </strong>
        </span>
      </div>
    </section>
  );
}

export default memo(
  PerformanceMatrix
);