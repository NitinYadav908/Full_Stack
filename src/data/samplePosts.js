export const PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "◎",
    color: "#ff3d81",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "in",
    color: "#2f81f7",
  },
  {
    id: "twitter",
    name: "X / Twitter",
    icon: "𝕏",
    color: "#111827",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "f",
    color: "#4f7cff",
  },
];

export const DAY_NAMES = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export const HOURS =
  Array.from(
    {
      length: 11,
    },
    (_, index) =>
      index + 8
  );

export const initialPosts = [
  {
    id: "p1",
    title: "Product launch teaser",
    platform: "instagram",
    status: "Scheduled",
    day: 0,
    hour: 9,
    minute: 0,
  },
  {
    id: "p2",
    title: "Founder story thread",
    platform: "twitter",
    status: "Draft",
    day: 1,
    hour: 11,
    minute: 0,
  },
  {
    id: "p3",
    title: "Hiring announcement",
    platform: "linkedin",
    status: "Scheduled",
    day: 2,
    hour: 13,
    minute: 0,
  },
  {
    id: "p4",
    title: "Customer success story",
    platform: "facebook",
    status: "Published",
    day: 3,
    hour: 10,
    minute: 0,
  },
  {
    id: "p5",
    title: "Weekly product tips",
    platform: "instagram",
    status: "Scheduled",
    day: 4,
    hour: 15,
    minute: 0,
  },
  {
    id: "p6",
    title: "Behind the scenes",
    platform: "linkedin",
    status: "Draft",
    day: 5,
    hour: 12,
    minute: 0,
  },
  {
    id: "p7",
    title: "Community poll",
    platform: "twitter",
    status: "Scheduled",
    day: 6,
    hour: 16,
    minute: 0,
  },
];

export function clonePosts() {
  const now =
    new Date();

  const day =
    now.getDay();

  const monday =
    new Date(now);

  monday.setHours(
    12,
    0,
    0,
    0
  );

  monday.setDate(
    now.getDate() +
      (day === 0
        ? -6
        : 1 - day)
  );

  return initialPosts.map(
    (post) => {
      const date =
        new Date(
          monday
        );

      date.setDate(
        monday.getDate() +
          post.day
      );

      return {
        ...post,
        date:
          date
            .toISOString()
            .slice(
              0,
              10
            ),
      };
    }
  );
}

export function getPlatform(
  id
) {
  return (
    PLATFORMS.find(
      (platform) =>
        platform.id === id
    ) ||
    PLATFORMS[0]
  );
}