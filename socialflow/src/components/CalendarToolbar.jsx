function CalendarToolbar({ calendarRef }) {
  const goToday = () => {
    calendarRef?.current?.getApi().today();
  };

  const goPrevious = () => {
    calendarRef?.current?.getApi().prev();
  };

  const goNext = () => {
    calendarRef?.current?.getApi().next();
  };

  const changeView = (view) => {
    calendarRef?.current?.getApi().changeView(view);
  };

  return (
    <div className="calendar-toolbar">
      <div className="calendar-navigation">
        <button onClick={goPrevious}>←</button>

        <button onClick={goToday}>
          Today
        </button>

        <button onClick={goNext}>→</button>
      </div>

      <div className="calendar-views">
        <button onClick={() => changeView("dayGridMonth")}>
          Month
        </button>

        <button onClick={() => changeView("timeGridWeek")}>
          Week
        </button>

        <button onClick={() => changeView("timeGridDay")}>
          Day
        </button>
      </div>
    </div>
  );
}

export default CalendarToolbar;