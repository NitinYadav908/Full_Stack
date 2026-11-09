import React from "react";

import {
  usePerformanceContext,
} from "../context/PerformanceContext";

export default function RenderActivity() {
  const {
    metrics,
  } = usePerformanceContext();

  const action =
    metrics.lastInteraction?.label ||
    metrics.lastAction;

  return (
    <section className="panel activity">
      <div className="panel-head compact">
        <div>
          <span className="section-kicker">
            EVENT STREAM
          </span>

          <h3>
            What just happened
          </h3>
        </div>
      </div>

      <div className="activity-list">
        <div className="activity-item">
          <i className="move" />

          <span>
            {action}
          </span>
        </div>

        <div className="activity-item">
          <i className="commit" />

          <span>
            React commits:{" "}
            {metrics.commits}
          </span>
        </div>

        <div className="activity-item">
          <i className="toggle" />

          <span>
            Calendar calculations:{" "}
            {metrics.calculations}
          </span>
        </div>

        <div className="activity-item">
          <i className="create" />

          <span>
            Post changes:{" "}
            {metrics.postChanges}
          </span>
        </div>
      </div>
    </section>
  );
}