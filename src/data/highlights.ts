export interface Highlight {
  id: string;
  title: string;
  eyebrowKo: string;
  eyebrowEn: string;
  date: string;
  body: string;
  stat?: { value: string; label: string };
}

export const highlights: Highlight[] = [
  {
    id: "shoebox-letters",
    title: "The letters that came back",
    eyebrowKo: "나눔",
    eyebrowEn: "Giving",
    date: "2025-12-20",
    body: "Last winter we packed 214 shoeboxes for children in West Africa. This spring, a stack of letters came back with crayon drawings, careful English, and one kid who wanted to know if it really snows in New York. The boxes take an afternoon. The letters are why we keep doing it.",
    stat: { value: "214", label: "shoeboxes packed" },
  },
  {
    id: "mexico-clinic",
    title: "Three chairs, no waiting room",
    eyebrowKo: "선교",
    eyebrowEn: "Missions",
    date: "2025-12-30",
    body: "Our dental clinic team saw over 160 patients in five days out of a three-chair setup in a church courtyard in Oaxaca. Half the team had never been on a mission trip before. All of them signed up again for this year.",
    stat: { value: "160+", label: "patients seen" },
  },
  {
    id: "summer-school",
    title: "Teaching the teachers",
    eyebrowKo: "교육",
    eyebrowEn: "Teaching",
    date: "2026-07-30",
    body: "This summer's teaching team was the youngest we've ever fielded, mostly high schoolers who came up through the same summer school themselves. Watching a former student explain vowels in 한글 to a room of second graders closes a loop a decade in the making.",
  },
];
