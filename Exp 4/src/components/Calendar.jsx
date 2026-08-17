import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../redux/slices/postsSlice";

function Calendar() {
  const dispatch = useDispatch();

  const posts = useSelector(
    (state) => state.posts.items
  );

  const events = useMemo(() => {
    return posts
      .filter(
        (post) =>
          post.status === "scheduled" &&
          post.scheduledDate &&
          post.scheduledTime
      )
      .map((post) => ({
        id: String(post.id),
        title: post.content,
        start: `${post.scheduledDate}T${post.scheduledTime}`,
        duration: {
          minutes: post.duration || 30,
        },
        extendedProps: {
          platform: post.platform,
        },
      }));
  }, [posts]);

  const updateEvent = (event) => {
    if (!event.start) return;

    const date = event.start;

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    const hours = String(
      date.getHours()
    ).padStart(2, "0");

    const minutes = String(
      date.getMinutes()
    ).padStart(2, "0");

    dispatch(
      updatePost({
        id: event.id,
        scheduledDate:
          `${year}-${month}-${day}`,
        scheduledTime:
          `${hours}:${minutes}`,
      })
    );
  };

  return (
    <div className="calendar-wrapper">

      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        initialView="dayGridMonth"

        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right:
            "dayGridMonth,timeGridWeek,timeGridDay",
        }}

        events={events}

        editable={true}

        eventStartEditable={true}

        eventDurationEditable={false}

        eventDrop={(info) => {
          updateEvent(info.event);
        }}

        eventResize={(info) => {
          updateEvent(info.event);
        }}

        eventClick={(info) => {
          const post = posts.find(
            (item) =>
              String(item.id) ===
              String(info.event.id)
          );

          if (post) {
            alert(
              `Platform: ${post.platform}\n\n${post.content}\n\nScheduled: ${post.scheduledDate} ${post.scheduledTime}`
            );
          }
        }}

        eventContent={(eventInfo) => (
          <div className="calendar-event">

            <strong>
              {eventInfo.timeText}
            </strong>

            <span>
              {eventInfo.event.extendedProps.platform}
            </span>

            <div>
              {eventInfo.event.title}
            </div>

          </div>
        )}

        height="700px"

        nowIndicator={true}

        dayMaxEvents={4}

        selectable={true}

        weekends={true}

        slotMinTime="06:00:00"

        slotMaxTime="23:00:00"

        allDaySlot={false}

      />

    </div>
  );
}

export default Calendar;