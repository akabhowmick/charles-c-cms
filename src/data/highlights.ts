export interface Highlight {
  id: string;
  title: string;
  eyebrowKo: string;
  eyebrowEn: string;
  date: string;
  body: string;
  bodyKo: string;
  stat?: { value: string; label: string; labelKo: string };
}

export const highlights: Highlight[] = [
  {
    id: "shoebox-letters",
    title: "The letters that came back",
    eyebrowKo: "나눔",
    eyebrowEn: "Giving",
    date: "2025-12-20",
    body: "Last winter we packed 214 shoeboxes for children in West Africa. This spring, a stack of letters came back with crayon drawings, careful English, and one kid who wanted to know if it really snows in New York. The boxes take an afternoon. The letters are why we keep doing it.",
    bodyKo:
      "지난 겨울 우리는 서아프리카 어린이들을 위해 선물상자 214개를 포장했습니다. 이번 봄, 크레파스 그림과 정성스러운 영어 문장이 담긴 편지 뭉치가 도착했어요. 그중 한 아이는 뉴욕에 정말 눈이 오는지 궁금해했습니다. 상자를 포장하는 데는 오후 반나절이면 충분하지만, 이 편지들이야말로 우리가 계속하는 이유입니다.",
    stat: { value: "214", label: "shoeboxes packed", labelKo: "포장한 선물상자" },
  },
  {
    id: "mexico-clinic",
    title: "Three chairs, no waiting room",
    eyebrowKo: "선교",
    eyebrowEn: "Missions",
    date: "2025-12-30",
    body: "Our dental clinic team saw over 160 patients in five days out of a three-chair setup in a church courtyard in Oaxaca. Half the team had never been on a mission trip before. All of them signed up again for this year.",
    bodyKo:
      "치과 진료팀은 오악사카의 한 교회 마당에 의자 세 개를 놓고 닷새 동안 160명이 넘는 환자를 진료했습니다. 팀원의 절반은 단기선교가 처음이었지만, 모두가 올해 다시 신청했습니다.",
    stat: { value: "160+", label: "patients seen", labelKo: "진료한 환자" },
  },
  {
    id: "summer-school",
    title: "Teaching the teachers",
    eyebrowKo: "교육",
    eyebrowEn: "Teaching",
    date: "2026-07-30",
    body: "This summer's teaching team was the youngest we've ever fielded, mostly high schoolers who came up through the same summer school themselves. Watching a former student explain vowels in 한글 to a room of second graders closes a loop a decade in the making.",
    bodyKo:
      "올여름 교사팀은 역대 가장 어린 팀이었습니다. 대부분이 같은 여름학교를 거쳐온 고등학생들이었죠. 예전 학생이 2학년 교실에서 한글 모음을 설명하는 모습을 보니, 십 년에 걸친 순환이 완성되는 듯했습니다.",
  },
];
