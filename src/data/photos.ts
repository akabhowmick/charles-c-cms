export interface Photo {
  id: string;
  alt: string;
  label: string;
  labelKo: string;
  tone: string; // placeholder block color until real photos come in
}

export const photos: Photo[] = [
  { id: "p1", alt: "Volunteers sorting shoebox donations by age group in the fellowship hall", label: "Shoebox Drive", labelKo: "선물상자", tone: "#A68A6D" },
  { id: "p2", alt: "Youth group at the summit on the winter ski retreat", label: "Ski Retreat", labelKo: "수련회", tone: "#3F5C4E" },
  { id: "p3", alt: "Dental clinic team setting up chairs in Oaxaca", label: "Mexico Missions", labelKo: "멕시코 선교", tone: "#5C4F42" },
  { id: "p4", alt: "Summer school students practicing Korean writing", label: "Summer School", labelKo: "여름학교", tone: "#C9B49C" },
  { id: "p5", alt: "Praise team rehearsal in the main sanctuary", label: "Praise Team", labelKo: "찬양팀", tone: "#2E453A" },
  { id: "p6", alt: "Fellowship dinner tables set in the hall", label: "Fall Dinner", labelKo: "친교 만찬", tone: "#8A7358" },
  { id: "p7", alt: "Kids' craft table at vacation bible school", label: "VBS", labelKo: "여름성경학교", tone: "#B99F82" },
  { id: "p8", alt: "Volunteers loading donation boxes into a van", label: "Donation Run", labelKo: "기부 배송", tone: "#4E6B5C" },
];
