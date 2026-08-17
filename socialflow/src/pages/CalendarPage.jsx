import Calendar from "../components/Calendar";

function CalendarPage() {
  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Content Calendar</h1>

          <p>
            Plan, schedule and manage your social media posts.
          </p>
        </div>
      </div>

      <Calendar />

    </div>
  );
}

export default CalendarPage;