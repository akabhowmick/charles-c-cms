export interface SocialLink {
  id: string;
  /** Leave empty until the real channel URL is confirmed — empty links are not rendered. */
  href: string;
  labelEn: string;
  labelKo: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "youtube",
    href: "https://www.youtube.com/channel/UCUl46H7KQFJShZRhIbvafTg",
    labelEn: "YouTube",
    labelKo: "유튜브",
  },
  {
    id: "kakao",
    href: "https://pf.kakao.com/_RKBBK",
    labelEn: "KakaoTalk",
    labelKo: "카카오톡",
  },
];
