import {
  DAY_NAMES,
  HOURS,
} from "../data/samplePosts";

export function toISODate(
  date
) {
  const d =
    new Date(date);

  d.setHours(
    12,
    0,
    0,
    0
  );

  return d
    .toISOString()
    .slice(
      0,
      10
    );
}

export function startOfWeek(
  date = new Date()
) {
  const d =
    new Date(date);

  d.setHours(
    12,
    0,
    0,
    0
  );

  const day =
    d.getDay();

  const diff =
    day === 0
      ? -6
      : 1 - day;

  d.setDate(
    d.getDate() +
      diff
  );

  return d;
}

export function addDays(
  date,
  amount
) {
  const d =
    new Date(date);

  d.setDate(
    d.getDate() +
      amount
  );

  return d;
}

export function getWeekDates(
  referenceDate = new Date()
) {
  const monday =
    startOfWeek(
      referenceDate
    );

  return Array.from(
    {
      length: 7,
    },
    (_, index) =>
      addDays(
        monday,
        index
      )
  );
}

export function getMonthGrid(
  referenceDate = new Date()
) {
  const first =
    new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      1,
      12
    );

  const mondayOffset =
    (first.getDay() + 6) %
    7;

  const gridStart =
    addDays(
      first,
      -mondayOffset
    );

  const last =
    new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth() + 1,
      0,
      12
    );

  const sundayOffset =
    6 -
    ((last.getDay() + 6) %
      7);

  const gridEnd =
    addDays(
      last,
      sundayOffset
    );

  const count =
    Math.round(
      (gridEnd -
        gridStart) /
        86400000
    ) + 1;

  return Array.from(
    {
      length: count,
    },
    (_, index) =>
      addDays(
        gridStart,
        index
      )
  );
}

export function getCellKey(
  date,
  hour
) {
  return `${toISODate(
    date
  )}-${hour}`;
}

export function groupPostsByCell(
  posts
) {
  const grouped =
    new Map();

  posts.forEach(
    (post) => {
      const date =
        post.date ||
        toISODate(
          new Date()
        );

      const key =
        `${date}-${post.hour}`;

      if (
        !grouped.has(key)
      ) {
        grouped.set(
          key,
          []
        );
      }

      grouped
        .get(key)
        .push(post);
    }
  );

  return grouped;
}

export function groupPostsByDate(
  posts
) {
  const grouped =
    new Map();

  posts.forEach(
    (post) => {
      const key =
        post.date ||
        toISODate(
          new Date()
        );

      if (
        !grouped.has(key)
      ) {
        grouped.set(
          key,
          []
        );
      }

      grouped
        .get(key)
        .push(post);
    }
  );

  return grouped;
}

export function formatTime(
  hour,
  minute = 0
) {
  return `${String(
    hour
  ).padStart(
    2,
    "0"
  )}:${String(
    minute
  ).padStart(
    2,
    "0"
  )}`;
}

export function formatMonthYear(
  date
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  ).format(date);
}

export function formatDateInput(
  date
) {
  return toISODate(
    date
  );
}

export function createPost(
  number,
  payload = {}
) {
  const safeNumber =
    Number(number) || 1;

  const defaultDate =
    getWeekDates()[
      Math.min(
        safeNumber - 1,
        6
      )
    ] ||
    getWeekDates()[0];

  return {
    id:
      typeof crypto !==
        "undefined" &&
      crypto.randomUUID
        ? crypto.randomUUID()
        : `post-${Date.now()}-${Math.random()}`,

    title:
      payload.title?.trim() ||
      `New campaign post ${safeNumber}`,

    platform:
      payload.platform ||
      "instagram",

    status:
      payload.status ||
      "Draft",

    date:
      payload.date ||
      toISODate(
        defaultDate
      ),

    hour:
      Number(
        payload.hour ??
          HOURS[
            (safeNumber - 1) %
              HOURS.length
          ]
      ),

    minute:
      Number(
        payload.minute ??
          0
      ),
  };
}

export function movePost(
  posts,
  id,
  date,
  hour
) {
  return posts.map(
    (post) =>
      post.id === id
        ? {
            ...post,
            date:
              toISODate(
                date
              ),
            hour:
              Number(hour),
          }
        : post
  );
}

export function formatLocation(
  day,
  hour
) {
  return `${DAY_NAMES[day]} ${formatTime(hour)}`;
}