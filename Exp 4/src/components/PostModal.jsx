import React, {
  useEffect,
  useState,
} from "react";

import {
  X,
  CalendarPlus,
} from "lucide-react";

import {
  PLATFORMS,
} from "../data/samplePosts";

import {
  formatDateInput,
} from "../utils/calendar";

const STATUS_OPTIONS = [
  "Draft",
  "Scheduled",
  "Published",
];

export default function PostModal({
  open,
  initialDate,
  initialHour = 9,
  onClose,
  onCreate,
}) {
  const [
    form,
    setForm,
  ] = useState({
    title: "",
    platform: "instagram",
    status: "Scheduled",
    date: formatDateInput(
      initialDate || new Date()
    ),
    hour: String(initialHour),
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      title: "",
      platform: "instagram",
      status: "Scheduled",
      date: formatDateInput(
        initialDate || new Date()
      ),
      hour: String(
        initialHour
      ),
    });
  }, [
    open,
    initialDate,
    initialHour,
  ]);

  if (!open) {
    return null;
  }

  const update = (
    key,
    value
  ) => {
    setForm(
      (current) => ({
        ...current,
        [key]: value,
      })
    );
  };

  const submit = (
    event
  ) => {
    event.preventDefault();

    if (
      !form.title.trim()
    ) {
      return;
    }

    onCreate({
      title: form.title,
      platform:
        form.platform,
      status:
        form.status,
      date: form.date,
      hour: Number(
        form.hour
      ),
      minute: 0,
    });

    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={onClose}
    >

      <div
        className="modal create-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        <div className="modal-header">

          <div className="modal-heading">

            <div className="modal-icon">
              <CalendarPlus size={20} />
            </div>

            <div>

              <span className="section-kicker">
                CONTENT CALENDAR
              </span>

              <h3>
                Create new post
              </h3>

              <p>
                Add a post directly to your
                publishing schedule.
              </p>

            </div>

          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>

        </div>

        <form
          onSubmit={submit}
        >

          <label className="form-field full">

            <span>
              Post title
            </span>

            <input
              autoFocus
              value={form.title}
              onChange={(event) =>
                update(
                  "title",
                  event.target.value
                )
              }
              placeholder="e.g. Product launch announcement"
            />

          </label>

          <div className="form-grid">

            <label className="form-field">

              <span>
                Platform
              </span>

              <select
                value={
                  form.platform
                }
                onChange={(event) =>
                  update(
                    "platform",
                    event.target.value
                  )
                }
              >

                {PLATFORMS.map(
                  (platform) => (
                    <option
                      value={
                        platform.id
                      }
                      key={
                        platform.id
                      }
                    >
                      {platform.name}
                    </option>
                  )
                )}

              </select>

            </label>

            <label className="form-field">

              <span>
                Status
              </span>

              <select
                value={
                  form.status
                }
                onChange={(event) =>
                  update(
                    "status",
                    event.target.value
                  )
                }
              >

                {STATUS_OPTIONS.map(
                  (status) => (
                    <option
                      value={status}
                      key={status}
                    >
                      {status}
                    </option>
                  )
                )}

              </select>

            </label>

            <label className="form-field">

              <span>
                Date
              </span>

              <input
                type="date"
                value={
                  form.date
                }
                onChange={(event) =>
                  update(
                    "date",
                    event.target.value
                  )
                }
              />

            </label>

            <label className="form-field">

              <span>
                Time
              </span>

              <select
                value={
                  form.hour
                }
                onChange={(event) =>
                  update(
                    "hour",
                    event.target.value
                  )
                }
              >

                {Array.from(
                  {
                    length: 11,
                  },
                  (_, index) =>
                    index + 8
                ).map(
                  (hour) => (
                    <option
                      value={hour}
                      key={hour}
                    >
                      {String(
                        hour
                      ).padStart(
                        2,
                        "0"
                      )}
                      :00
                    </option>
                  )
                )}

              </select>

            </label>

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
            >
              Create post
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}