import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Plus,
} from "lucide-react";

import {
  DAY_NAMES,
  HOURS,
} from "../data/samplePosts";

import {
  addDays,
  formatMonthYear,
  formatTime,
  getCellKey,
  getMonthGrid,
  getWeekDates,
  groupPostsByCell,
  groupPostsByDate,
  toISODate,
} from "../utils/calendar";

import {
  usePerformanceContext,
} from "../context/PerformanceContext";

import CalendarEvent from "./CalendarEvent";

import useRenderTracker from "../hooks/useRenderTracker";

function isSameDate(a, b) {
  return toISODate(a) === toISODate(b);
}

export default function CalendarView({
  posts,
  onMove,
  onSelect,
  onAddPost,
}) {
  useRenderTracker("CalendarView");

  const {
    useMemoOn,
    useCallbackOn,
    reactMemoOn,
    revision,
    markCalculation,
    markDragStart,
  } = usePerformanceContext();

  const [view, setView] = useState("week");

  const [anchorDate, setAnchorDate] =
    useState(new Date());

  const [dragOver, setDragOver] =
    useState(null);

  const weekDates = useMemo(
    () => getWeekDates(anchorDate),
    [anchorDate]
  );

  const monthDates = useMemo(
    () => getMonthGrid(anchorDate),
    [anchorDate]
  );

  /*
   * useMemo TEST
   *
   * ON:
   * calculation is based on posts.
   *
   * OFF:
   * revision forces recalculation.
   */
  const memoDependency =
    useMemoOn
      ? posts
      : { revision };

  const groupedByCell = useMemo(
    () => {
      markCalculation();

      return groupPostsByCell(posts);
    },
    [
      memoDependency,
      markCalculation,
    ]
  );

  const groupedByDate = useMemo(
    () => {
      markCalculation();

      return groupPostsByDate(posts);
    },
    [
      memoDependency,
      markCalculation,
    ]
  );

  /*
   * useCallback TEST
   *
   * ON:
   * callbacks stay stable.
   *
   * OFF:
   * revision changes the callback.
   */
  const callbackNonce =
    useCallbackOn
      ? null
      : revision;

  const handleDragStart =
    useCallback(
      (event, id) => {
        markDragStart();

        event.dataTransfer.setData(
          "text/plain",
          id
        );

        event.dataTransfer.effectAllowed =
          "move";
      },
      [
        markDragStart,
        callbackNonce,
      ]
    );

  const handleDrop =
    useCallback(
      (
        event,
        date,
        hour
      ) => {
        event.preventDefault();

        const id =
          event.dataTransfer.getData(
            "text/plain"
          );

        if (!id) return;

        onMove(
          id,
          date,
          hour
        );

        setDragOver(null);
      },
      [
        onMove,
        callbackNonce,
      ]
    );

  const handleDateDrop =
    useCallback(
      (
        event,
        date
      ) => {
        event.preventDefault();

        const id =
          event.dataTransfer.getData(
            "text/plain"
          );

        if (!id) return;

        const post =
          posts.find(
            (item) =>
              item.id === id
          );

        if (post) {
          onMove(
            id,
            date,
            post.hour
          );
        }

        setDragOver(null);
      },
      [
        posts,
        onMove,
        callbackNonce,
      ]
    );

  const handleDragOver =
    useCallback(
      (
        event,
        key
      ) => {
        event.preventDefault();

        event.dataTransfer.dropEffect =
          "move";

        if (
          dragOver !== key
        ) {
          setDragOver(key);
        }
      },
      [
        dragOver,
        callbackNonce,
      ]
    );

  const goPrevious = () => {
    setAnchorDate(
      (current) =>
        view === "week"
          ? addDays(
              current,
              -7
            )
          : new Date(
              current.getFullYear(),
              current.getMonth() - 1,
              15
            )
    );

    setDragOver(null);
  };

  const goNext = () => {
    setAnchorDate(
      (current) =>
        view === "week"
          ? addDays(
              current,
              7
            )
          : new Date(
              current.getFullYear(),
              current.getMonth() + 1,
              15
            )
    );

    setDragOver(null);
  };

  const goToday = () => {
    setAnchorDate(
      new Date()
    );

    setDragOver(null);
  };

  const title =
    view === "week"
      ? `${weekDates[0].toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
          }
        )} – ${weekDates[6].toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )}`
      : formatMonthYear(
          anchorDate
        );

  return (
    <div className="calendar-shell">

      {/* TOOLBAR */}
      <div className="calendar-toolbar">

        <div className="calendar-title-group">

          <div className="calendar-title-icon">
            <CalendarDays size={18} />
          </div>

          <div>

            <span className="section-kicker">
              CONTENT CALENDAR
            </span>

            <h3>
              {view === "week"
                ? "Weekly publishing board"
                : "Monthly publishing calendar"}
            </h3>

            <p>
              {title}
            </p>

          </div>

        </div>

        <div className="calendar-actions">

          <div className="view-switcher">

            <button
              className={
                view === "week"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setView("week")
              }
            >
              Week
            </button>

            <button
              className={
                view === "month"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setView("month")
              }
            >
              Month
            </button>

          </div>

          <button
            className="calendar-nav"
            onClick={goPrevious}
            aria-label="Previous"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            className="today-btn"
            onClick={goToday}
          >
            Today
          </button>

          <button
            className="calendar-nav"
            onClick={goNext}
            aria-label="Next"
          >
            <ChevronRight size={17} />
          </button>

          <button
            className="add-btn"
            onClick={() =>
              onAddPost(
                view === "week"
                  ? weekDates[0]
                  : anchorDate,
                9
              )
            }
          >
            <Plus size={16} />
            Add post
          </button>

        </div>

      </div>

      {/* WEEKLY VIEW */}
      {view === "week" ? (

        <div className="weekly-calendar">

          <div className="calendar-head">

            <div className="time-spacer">
              TIME
            </div>

            {weekDates.map(
              (
                date,
                index
              ) => (

                <div
                  className={`day-head ${
                    isSameDate(
                      date,
                      new Date()
                    )
                      ? "today"
                      : ""
                  }`}
                  key={toISODate(date)}
                >

                  <span>
                    {DAY_NAMES[index]}
                  </span>

                  <b>
                    {date.getDate()}
                  </b>

                  <small>
                    {date.toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                      }
                    )}
                  </small>

                </div>

              )
            )}

          </div>

          <div className="calendar-scroll">

            {HOURS.map(
              (hour) => (

                <div
                  className="calendar-row"
                  key={hour}
                >

                  <div className="time-label">
                    {formatTime(hour)}
                  </div>

                  {weekDates.map(
                    (date) => {

                      const key =
                        getCellKey(
                          date,
                          hour
                        );

                      const items =
                        groupedByCell.get(
                          key
                        ) || [];

                      return (
                        <div
                          key={key}
                          className={`calendar-cell ${
                            dragOver === key
                              ? "drag-over"
                              : ""
                          }`}
                          onDragOver={(event) =>
                            handleDragOver(
                              event,
                              key
                            )
                          }
                          onDragLeave={() =>
                            setDragOver(
                              null
                            )
                          }
                          onDrop={(event) =>
                            handleDrop(
                              event,
                              date,
                              hour
                            )
                          }
                          onDoubleClick={() =>
                            onAddPost(
                              date,
                              hour
                            )
                          }
                        >

                          {items.map(
                            (post) => (

                              <CalendarEvent
                                key={post.id}
                                post={post}
                                onDragStart={
                                  handleDragStart
                                }
                                onClick={
                                  onSelect
                                }
                                reactMemoOn={
                                  reactMemoOn
                                }
                              />

                            )
                          )}

                          {items.length ===
                            0 && (
                            <span className="empty-slot">
                              +
                            </span>
                          )}

                        </div>
                      );
                    }
                  )}

                </div>

              )
            )}

          </div>

        </div>

      ) : (

        /* MONTHLY VIEW */
        <div className="monthly-calendar">

          <div className="month-weekdays">

            {DAY_NAMES.map(
              (day) => (
                <div key={day}>
                  {day}
                </div>
              )
            )}

          </div>

          <div className="month-grid">

            {monthDates.map(
              (date) => {

                const key =
                  toISODate(date);

                const items =
                  groupedByDate.get(
                    key
                  ) || [];

                const inMonth =
                  date.getMonth() ===
                  anchorDate.getMonth();

                const today =
                  isSameDate(
                    date,
                    new Date()
                  );

                return (
                  <div
                    key={key}
                    className={`month-cell ${
                      !inMonth
                        ? "outside"
                        : ""
                    } ${
                      today
                        ? "today"
                        : ""
                    } ${
                      dragOver === key
                        ? "drag-over"
                        : ""
                    }`}
                    onDragOver={(event) =>
                      handleDragOver(
                        event,
                        key
                      )
                    }
                    onDragLeave={() =>
                      setDragOver(null)
                    }
                    onDrop={(event) =>
                      handleDateDrop(
                        event,
                        date
                      )
                    }
                    onDoubleClick={() =>
                      onAddPost(
                        date,
                        9
                      )
                    }
                  >

                    <div className="month-cell-head">

                      <span className="month-date">
                        {date.getDate()}
                      </span>

                      {items.length >
                        0 && (
                        <span className="post-count">
                          {items.length}
                        </span>
                      )}

                    </div>

                    <div className="month-posts">

                      {items.map(
                        (post) => (

                          <CalendarEvent
                            key={post.id}
                            post={post}
                            onDragStart={
                              handleDragStart
                            }
                            onClick={
                              onSelect
                            }
                            reactMemoOn={
                              reactMemoOn
                            }
                          />

                        )
                      )}

                      {items.length ===
                        0 && (
                        <span className="month-empty">
                          Add post
                        </span>
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      )}

      {/* FOOTER */}
      <div className="calendar-footer">

        <span>
          <i className="legend-dot" />
          Drag posts to reschedule
        </span>

        <span>
          Double-click an empty slot to create
        </span>

        <span>
          <kbd>useMemo</kbd>
          {useMemoOn
            ? " ON"
            : " OFF"}
        </span>

        <span>
          <kbd>useCallback</kbd>
          {useCallbackOn
            ? " ON"
            : " OFF"}
        </span>

        <span>
          <kbd>React.memo</kbd>
          {reactMemoOn
            ? " ON"
            : " OFF"}
        </span>

      </div>

    </div>
  );
}