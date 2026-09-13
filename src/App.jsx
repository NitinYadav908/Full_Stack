import React, { Profiler, useCallback, useState } from "react";

import Header from "./components/Header";
import CalendarView from "./components/CalendarView";
import PerformanceControls from "./components/PerformanceControls";
import PerformanceInspector from "./components/PerformanceInspector";
import PerformanceMatrix from "./components/PerformanceMatrix";
import OptimizationSummary from "./components/OptimizationSummary";
import RenderActivity from "./components/RenderActivity";
import PostModal from "./components/PostModal";

import { usePosts } from "./context/PostContext";
import { usePerformanceContext } from "./context/PerformanceContext";
import useRenderTracker from "./hooks/useRenderTracker";

export default function App() {
  useRenderTracker("App");

  const {
    posts,
    updatePostPosition,
    addNewPost,
    resetPosts,
  } = usePosts();

  const {
    markCommit,
    useMemoOn,
    useCallbackOn,
    reactMemoOn,
  } = usePerformanceContext();

  const [modal, setModal] = useState({
    open: false,
    date: new Date(),
    hour: 9,
  });

  const handleSelectPost = useCallback((post) => {
    const date = post.date
      ? new Date(`${post.date}T12:00:00`)
      : new Date();

    setModal({
      open: true,
      date,
      hour: post.hour || 9,
    });
  }, []);

  const openCreate = useCallback((date = new Date(), hour = 9) => {
    setModal({
      open: true,
      date,
      hour,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModal((current) => ({
      ...current,
      open: false,
    }));
  }, []);

  const handleProfilerRender = useCallback(
    (id, phase) => {
      markCommit();

      if (phase === "update") {
        console.debug(
          `[Performance] ${id} committed`
        );
      }
    },
    [markCommit]
  );

  const allOn =
    useMemoOn &&
    useCallbackOn &&
    reactMemoOn;

  const allOff =
    !useMemoOn &&
    !useCallbackOn &&
    !reactMemoOn;

  const modeLabel = allOn
    ? "ALL OPTIMIZATIONS ON"
    : allOff
      ? "BASELINE — ALL OFF"
      : "CUSTOM CONFIGURATION";

  return (
    <Profiler
      id="PerformanceInspector"
      onRender={handleProfilerRender}
    >
      <div className="app">

        <Header
          optimized={allOn}
          onReset={resetPosts}
        />

        <main className="main">

          {/* HERO */}
          <section className="hero">

            <div className="hero-copy">

              <span className="section-kicker">
                INTERACTIVE BENCHMARK
              </span>

              <h2>
                See optimization effects{" "}
                <em>as they happen.</em>
              </h2>

              <p>
                Test React rendering performance by
                switching each optimization independently.
                Then perform the same calendar interaction
                to compare the results.
              </p>

            </div>

            <div
              className={`hero-badge ${
                allOn ? "optimized" : ""
              }`}
            >
              <span>
                Test configuration
              </span>

              <strong>
                {modeLabel}
              </strong>
            </div>

          </section>

          {/* THREE OPTIMIZATION TOGGLES */}
          <PerformanceControls />

          {/* LIVE METRICS */}
          <PerformanceInspector
            postsCount={posts.length}
          />

          {/* CALENDAR + SIDEBAR */}
          <div className="content-grid">

            <section className="calendar-panel panel">

              <CalendarView
                posts={posts}
                onMove={updatePostPosition}
                onSelect={handleSelectPost}
                onAddPost={openCreate}
              />

            </section>

            <aside className="side">

              <OptimizationSummary
                postsCount={posts.length}
              />

              <RenderActivity />

            </aside>

          </div>

          {/* PERFORMANCE MATRIX */}
          <PerformanceMatrix
            postsCount={posts.length}
          />

          {/* CREATE POST */}
          <PostModal
            open={modal.open}
            initialDate={modal.date}
            initialHour={modal.hour}
            onClose={closeModal}
            onCreate={addNewPost}
          />

        </main>
      </div>
    </Profiler>
  );
}