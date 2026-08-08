export type AgeGroup = "youth" | "college" | "adults" | "all";

export interface ServeEvent {
  id: string;
  title: string;
  titleKo: string;
  group: AgeGroup;
  date: string; // ISO date
  time: string;
  location: string;
  description: string;
  spotsTotal: number;
  spotsTaken: number;
  signupDeadline: string;
  tags: string[];
}

export const GROUP_LABELS: Record<AgeGroup, { en: string; ko: string }> = {
  youth: { en: "Youth (Elem-HS)", ko: "유스" },
  college: { en: "College & Young Adults", ko: "청년" },
  adults: { en: "Adults", ko: "장년" },
  all: { en: "All Ages", ko: "전체" },
};

export const events: ServeEvent[] = [
  {
    id: "shoebox-2026",
    title: "Christmas Shoebox Drive",
    titleKo: "크리스마스 선물상자",
    group: "all",
    date: "2026-11-14",
    time: "10:00 AM - 2:00 PM",
    location: "Fellowship Hall",
    description:
      "Pack and sort gift shoeboxes for children overseas. Volunteers sort donations by age group, assemble boxes, and write welcome letters to recipients. No experience needed, and younger kids are welcome with a parent.",
    spotsTotal: 40,
    spotsTaken: 26,
    signupDeadline: "2026-11-07",
    tags: ["Donations", "Family friendly"],
  },
  {
    id: "mexico-mission-2026",
    title: "Mexico Mission Trip",
    titleKo: "멕시코 단기선교",
    group: "college",
    date: "2026-12-27",
    time: "7-day trip",
    location: "Oaxaca, Mexico",
    description:
      "A week of construction, dental clinic support, and children's programs alongside our partner church. Team meetings begin in October. Passport required; fundraising support available.",
    spotsTotal: 16,
    spotsTaken: 11,
    signupDeadline: "2026-10-15",
    tags: ["Mission trip", "Travel"],
  },
  {
    id: "ski-retreat-2027",
    title: "Youth Winter Ski Retreat",
    titleKo: "청소년 겨울 수련회",
    group: "youth",
    date: "2027-01-15",
    time: "Fri-Sun weekend",
    location: "Hunter Mountain, NY",
    description:
      "Our annual winter retreat: skiing, small groups, evening worship, and way too much hot chocolate. Volunteer chaperones and small-group leaders also needed, and college students are encouraged to apply.",
    spotsTotal: 60,
    spotsTaken: 48,
    signupDeadline: "2026-12-20",
    tags: ["Retreat", "Overnight"],
  },
  {
    id: "summer-school-2026",
    title: "Summer School Teaching Team",
    titleKo: "여름학교 교사팀",
    group: "college",
    date: "2026-08-17",
    time: "Weekday mornings, 2 weeks",
    location: "Education Wing",
    description:
      "Teach Korean language, lead activities, and wrangle elementary schoolers for our two-week summer program. Teaching materials provided; patience not included.",
    spotsTotal: 12,
    spotsTaken: 12,
    signupDeadline: "2026-08-01",
    tags: ["Teaching", "Kids"],
  },
  {
    id: "praise-orchestra",
    title: "Praise Team & Orchestra",
    titleKo: "찬양팀 · 오케스트라",
    group: "all",
    date: "2026-09-06",
    time: "Sundays, ongoing",
    location: "Main Sanctuary",
    description:
      "Ongoing openings for vocalists, orchestra players, and choir members across all services. Auditions are informal. Bring your instrument and we'll find you a seat.",
    spotsTotal: 20,
    spotsTaken: 9,
    signupDeadline: "2026-12-31",
    tags: ["Music", "Ongoing"],
  },
  {
    id: "fall-fellowship-2026",
    title: "Fall Fellowship Dinner",
    titleKo: "가을 친교 만찬",
    group: "adults",
    date: "2026-10-24",
    time: "5:30 PM - 8:30 PM",
    location: "Fellowship Hall",
    description:
      "Help host our church-wide fall dinner: setup crew, kitchen team, and cleanup squad all needed. The kitchen team gets first taste of the galbi. That is the whole pitch.",
    spotsTotal: 25,
    spotsTaken: 7,
    signupDeadline: "2026-10-17",
    tags: ["Hospitality", "Food"],
  },
];
