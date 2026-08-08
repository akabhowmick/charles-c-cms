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
  descriptionKo: string;
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
    descriptionKo:
      "해외 어린이들을 위한 선물상자를 포장하고 정리합니다. 봉사자들은 기부 물품을 연령별로 분류하고, 상자를 조립하고, 받는 친구에게 보낼 환영 편지를 씁니다. 경험이 없어도 괜찮고, 어린 자녀도 보호자와 함께 참여할 수 있습니다.",
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
    descriptionKo:
      "협력 교회와 함께 일주일간 건축, 치과 진료 지원, 어린이 프로그램을 진행합니다. 팀 모임은 10월에 시작됩니다. 여권이 필요하며, 모금 지원을 받을 수 있습니다.",
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
    descriptionKo:
      "매년 열리는 겨울 수련회입니다: 스키, 소그룹 모임, 저녁 예배, 그리고 너무 많은 핫초코가 기다리고 있어요. 인솔 봉사자와 소그룹 리더도 필요하며, 대학생들의 지원을 환영합니다.",
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
    descriptionKo:
      "2주간 진행되는 여름 프로그램에서 한국어를 가르치고, 활동을 이끌고, 초등학생들을 돌봅니다. 교재는 제공되지만, 인내심은 각자 준비해주세요.",
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
    descriptionKo:
      "모든 예배에서 보컬, 오케스트라 연주자, 찬양대원을 상시 모집합니다. 오디션은 편안한 분위기로 진행됩니다. 악기를 가져오시면 자리를 마련해드릴게요.",
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
    descriptionKo:
      "교회 전체가 함께하는 가을 만찬을 도와주세요: 세팅팀, 주방팀, 정리팀 모두 필요합니다. 주방팀은 갈비를 가장 먼저 맛볼 수 있어요. 그게 전부입니다.",
    spotsTotal: 25,
    spotsTaken: 7,
    signupDeadline: "2026-10-17",
    tags: ["Hospitality", "Food"],
  },
];
