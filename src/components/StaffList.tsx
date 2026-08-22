import { consentedStaff } from "@/data/staff";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

/** Renders only staff who have given written consent. Nothing renders if none have. */
export function StaffList() {
  const { locale, t } = useLocale();
  const people = consentedStaff();
  if (people.length === 0) return null;

  return (
    <section aria-labelledby="staff-heading" className="mt-14">
      <h2 id="staff-heading" className="font-display text-2xl font-bold">
        {t.about.staffHeading}
      </h2>
      <p className="mt-3 max-w-2xl text-ink-soft">{t.about.staffSubtitle}</p>

      <ul role="list" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person, i) => (
          <li key={person.id}>
            <Reveal delay={i * 80}>
              <article className="h-full rounded-3xl border border-taupe-strong bg-white p-6">
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <p
                    aria-hidden="true"
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-pine-tint font-display text-xl font-bold text-pine"
                  >
                    {initials(person.name)}
                  </p>
                )}
                <h3 className="mt-4 font-display text-lg font-bold">
                  {locale === "ko" ? person.nameKo : person.name}
                </h3>
                <p className="text-sm text-taupe">
                  {locale === "ko" ? person.roleKo : person.role}
                </p>
                {(locale === "ko" ? person.bioKo : person.bio) && (
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {locale === "ko" ? person.bioKo : person.bio}
                  </p>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
