export const COMPONENT_NAMES = [
  "App",
  "CalendarView",
  "CalendarEvent",
  "PostCard",
  "PerformanceInspector",
  "PerformanceMatrix",
  "OptimizationSummary",
  "PerformanceControls",
];

export function createInitialMetrics() {
  const renders = {};

  COMPONENT_NAMES.forEach((name) => {
    renders[name] = 0;
  });

  return {
    renders,

    commits: 0,
    calculations: 0,
    callbackCreations: 0,

    dragStarts: 0,
    dragDrops: 0,
    postChanges: 0,

    memoHits: 0,

    optimizedOperations: 0,
    nonOptimizedOperations: 0,

    lastAction: "Ready — interact with the calendar",

    lastInteraction: {
      label: "Initial render",
      before: { ...renders },
    },
  };
}

export function cloneRenderCounts(metrics) {
  return {
    ...metrics.renders,
  };
}

export function calculateTotalRenders(metrics) {
  return Object.values(metrics.renders).reduce(
    (total, value) => total + value,
    0
  );
}

export function calculateRenderDelta(metrics, component) {
  const current = metrics.renders[component] || 0;

  const previous =
    metrics.lastInteraction?.before?.[component] || 0;

  return Math.max(0, current - previous);
}

export function calculateWorkUnits({
  postsCount,
  postRenders,
  calculations,
  callbackCreations,
  optimized,
}) {
  const base =
    postsCount * 2 +
    postRenders +
    calculations +
    callbackCreations;

  if (optimized) {
    return Math.max(1, Math.round(base * 0.65));
  }

  return Math.max(1, base);
}

export function calculateBaselineWork(metrics, postsCount) {
  return Math.max(
    1,
    postsCount * 2 +
      metrics.postChanges * postsCount +
      metrics.calculations
  );
}