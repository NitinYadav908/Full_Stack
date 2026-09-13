import React from "react";

import { usePerformanceContext } from "../context/PerformanceContext";

function ToggleCard({
  active,
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      className={`toggle-card ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      <div className="toggle-icon">
        {icon}
      </div>

      <div>
        <b>{title}</b>

        <span>
          {description}
        </span>
      </div>

      <i className="switch">
        <u />
      </i>
    </button>
  );
}

export default function PerformanceControls() {
  const {
    useMemoOn,
    useCallbackOn,
    reactMemoOn,
    toggleMemo,
    toggleCallback,
    toggleReactMemo,
  } = usePerformanceContext();

  return (
    <section className="controls-panel">
      <div className="control-title">
        <div>
          <span className="section-kicker">
            OPTIMIZATION CONTROLS
          </span>

          <h3>
            Toggle each technique
          </h3>
        </div>

        <span className="control-help">
          Change a toggle, then drag a post to compare counts.
        </span>
      </div>

      <div className="toggles">
        <ToggleCard
          active={useMemoOn}
          icon="M"
          title="useMemo"
          description="Memoize derived calendar work"
          onClick={toggleMemo}
        />

        <ToggleCard
          active={useCallbackOn}
          icon="ƒ"
          title="useCallback"
          description="Stabilize event handlers"
          onClick={toggleCallback}
        />

        <ToggleCard
          active={reactMemoOn}
          icon="R"
          title="React.memo"
          description="Skip unchanged post renders"
          onClick={toggleReactMemo}
        />
      </div>
    </section>
  );
}