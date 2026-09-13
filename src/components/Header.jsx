import React from "react";

export default function Header({
  optimized,
  onReset,
}) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">
          <span>⚡</span>
        </div>

        <div>
          <div className="eyebrow">
            REACT PERFORMANCE LAB
          </div>

          <h1>
            Live Calendar Performance Inspector
          </h1>
        </div>
      </div>

      <div className="top-actions">
        <span
          className={`live-pill ${
            optimized ? "on" : "off"
          }`}
        >
          <i />
          LIVE MONITOR
        </span>

        <button
          className="ghost-btn"
          onClick={onReset}
        >
          ↻ Reset demo
        </button>
      </div>
    </header>
  );
}