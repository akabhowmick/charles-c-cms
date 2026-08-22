import { Youtube } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/social";
import { KakaoIcon } from "@/components/icons/KakaoIcon";
import { useLocale } from "@/context/LocaleContext";

const ICONS: Record<string, (props: { size?: number }) => JSX.Element> = {
  youtube: ({ size = 20 }) => <Youtube size={size} aria-hidden="true" />,
  kakao: ({ size = 20 }) => <KakaoIcon size={size} />,
};

/** Icon links to the church's social channels. Unset URLs are skipped. */
export function SocialLinks({ className = "" }: { className?: string }) {
  const { locale, t } = useLocale();
  const links = SOCIAL_LINKS.filter((s) => s.href);
  if (links.length === 0) return null;

  return (
    <ul role="list" className={`flex items-center gap-2 ${className}`}>
      {links.map((s) => {
        const Icon = ICONS[s.id];
        const label = locale === "ko" ? s.labelKo : s.labelEn;
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              // Target size stays >= 24x24 via p-2 around a 20px icon (WCAG 2.5.8).
              className="inline-flex rounded-full p-2 text-ink-soft transition-colors hover:bg-paper hover:text-pine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
              aria-label={t.layout.socialLinkLabel(label)}
            >
              {Icon ? <Icon /> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
