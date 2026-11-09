import React, { memo } from "react";

function MetricCard({
  label,
  value,
  hint,
  accent,
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>

        <span
          className={`dot ${accent}`}
        />
      </div>

      <strong>{value}</strong>

      <small>{hint}</small>
    </div>
  );
}

export default memo(MetricCard);