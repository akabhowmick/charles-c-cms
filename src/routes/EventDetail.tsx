import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { events, GROUP_LABELS } from "@/data/events";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useSignups } from "@/context/SignupContext";
import { useLocale } from "@/context/LocaleContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, Textarea } from "@/components/ui/Input";
import { Reveal } from "@/components/Reveal";

export function EventDetail() {
  const { eventId } = useParams({ from: "/opportunities/$eventId" });
  const event = events.find((e) => e.id === eventId);
  const { user } = useAuth();
  const { addSignup, cancelSignup, hasSignedUp } = useSignups();
  const { locale, t } = useLocale();
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold">{t.eventDetail.notFoundTitle}</h1>
        <p className="mt-3 text-ink-soft">{t.eventDetail.notFoundBody}</p>
        <Link to="/opportunities" className="mt-6 inline-block">
          <Button variant="secondary">{t.eventDetail.backToAll}</Button>
        </Link>
      </div>
    );
  }

  const group = GROUP_LABELS[event.group];
  const spotsLeft = event.spotsTotal - event.spotsTaken;
  const full = spotsLeft <= 0;
  const signedUp = user ? hasSignedUp(event.id, user.id) : false;

  async function handleSignup() {
    if (!user) return;
    setBusy(true);
    setError(null);
    const err = await addSignup({
      eventId: event!.id,
      userId: user.id,
      userName: user.name,
      note: note.trim() || undefined,
    });
    setBusy(false);
    if (err) setError(err);
    else setDone(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Reveal>
        <Link
          to="/opportunities"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pine underline-offset-4 hover:underline"
        >
          <ArrowLeft size={15} aria-hidden="true" /> {t.eventDetail.backLink}
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge>
            <span lang="ko" className="mr-1.5 font-display">{group.ko}</span>
            {group.en}
          </Badge>
          {event.tags.map((t) => (
            <Badge key={t} className="bg-paper-deep text-ink-soft">
              {t}
            </Badge>
          ))}
        </div>

        <h1 className="mt-4 font-display text-4xl font-bold leading-tight">
          {event.title}
        </h1>
        <p lang="ko" className="mt-1 text-lg text-taupe">
          {event.titleKo}
        </p>
      </Reveal>

      <Reveal delay={120}>
        <dl className="mt-8 grid gap-4 rounded-2xl border border-taupe-light/60 bg-white p-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <CalendarDays size={18} aria-hidden="true" className="mt-0.5 text-pine" />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-taupe">{t.eventDetail.dateLabel}</dt>
              <dd className="font-medium">{formatDate(event.date, locale)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} aria-hidden="true" className="mt-0.5 text-pine" />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-taupe">{t.eventDetail.timeLabel}</dt>
              <dd className="font-medium">{event.time}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} aria-hidden="true" className="mt-0.5 text-pine" />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-taupe">{t.eventDetail.locationLabel}</dt>
              <dd className="font-medium">{event.location}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users size={18} aria-hidden="true" className="mt-0.5 text-pine" />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-taupe">{t.eventDetail.spotsLabel}</dt>
              <dd className="font-medium">
                {full ? t.common.full : t.eventDetail.spotsLeftOfTotal(spotsLeft, event.spotsTotal)}
              </dd>
            </div>
          </div>
        </dl>
      </Reveal>

      <Reveal delay={200}>
        <p className="mt-8 leading-relaxed text-ink-soft">
          {locale === "ko" ? event.descriptionKo : event.description}
        </p>
        <p className="mt-4 text-sm text-ink-soft">
          {t.eventDetail.signupDeadline}{" "}
          <strong className="text-ink">{formatDate(event.signupDeadline, locale)}</strong>
        </p>
      </Reveal>

      <Reveal delay={280}>
        <div className="mt-10 rounded-2xl bg-pine-tint p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-pine-deep">{t.eventDetail.signUpHeading}</h2>

          {!user && (
            <div className="mt-4">
              <p className="text-ink-soft">{t.eventDetail.needAccount}</p>
              <div className="mt-4 flex gap-3">
                <Link to="/login">
                  <Button>{t.common.signIn}</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="secondary">{t.eventDetail.createAccount}</Button>
                </Link>
              </div>
            </div>
          )}

          {user && full && !signedUp && (
            <p className="mt-4 text-ink-soft">{t.eventDetail.eventFullMessage}</p>
          )}

          {user && signedUp && !done && (
            <div className="mt-4">
              <p className="font-medium text-pine-deep">{t.eventDetail.alreadySignedUp}</p>
              <Button
                variant="danger"
                className="mt-4"
                onClick={() => void cancelSignup(event.id, user.id)}
              >
                {t.eventDetail.cancelMySignup}
              </Button>
            </div>
          )}

          {user && done && (
            <div className="mt-4" role="status">
              <p className="font-medium text-pine-deep">
                {t.eventDetail.confirmedMessage(user.name)}
              </p>
              <Link to="/dashboard" className="mt-4 inline-block">
                <Button variant="secondary">{t.eventDetail.viewMySignups}</Button>
              </Link>
            </div>
          )}

          {user && !full && !signedUp && !done && (
            <div className="mt-4 space-y-4">
              <Field
                label={t.eventDetail.noteLabel}
                htmlFor="signup-note"
                hint={t.eventDetail.noteHint}
              >
                <Textarea
                  id="signup-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.eventDetail.notePlaceholder}
                />
              </Field>
              {error && (
                <p role="alert" className="text-sm font-medium text-red-800">
                  {error}
                </p>
              )}
              <Button onClick={() => void handleSignup()} disabled={busy}>
                {busy ? t.eventDetail.reserving : t.eventDetail.reserveMySpot}
              </Button>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
