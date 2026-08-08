import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { events, GROUP_LABELS } from "@/data/events";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useSignups } from "@/context/SignupContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Field, Textarea } from "@/components/ui/Input";
import { Reveal } from "@/components/Reveal";

export function EventDetail() {
  const { eventId } = useParams({ from: "/opportunities/$eventId" });
  const event = events.find((e) => e.id === eventId);
  const { user } = useAuth();
  const { addSignup, cancelSignup, hasSignedUp } = useSignups();
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold">Event not found</h1>
        <p className="mt-3 text-ink-soft">
          This event may have been removed or the link is out of date.
        </p>
        <Link to="/opportunities" className="mt-6 inline-block">
          <Button variant="secondary">Back to all opportunities</Button>
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
          <ArrowLeft size={15} aria-hidden="true" /> All opportunities
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
              <dt className="text-xs font-semibold uppercase tracking-wide text-taupe">Date</dt>
              <dd className="font-medium">{formatDate(event.date)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} aria-hidden="true" className="mt-0.5 text-pine" />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-taupe">Time</dt>
              <dd className="font-medium">{event.time}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} aria-hidden="true" className="mt-0.5 text-pine" />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-taupe">Location</dt>
              <dd className="font-medium">{event.location}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users size={18} aria-hidden="true" className="mt-0.5 text-pine" />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-taupe">Spots</dt>
              <dd className="font-medium">
                {full ? "Full" : `${spotsLeft} left of ${event.spotsTotal}`}
              </dd>
            </div>
          </div>
        </dl>
      </Reveal>

      <Reveal delay={200}>
        <p className="mt-8 leading-relaxed text-ink-soft">{event.description}</p>
        <p className="mt-4 text-sm text-ink-soft">
          Sign-up deadline: <strong className="text-ink">{formatDate(event.signupDeadline)}</strong>
        </p>
      </Reveal>

      <Reveal delay={280}>
        <div className="mt-10 rounded-2xl bg-pine-tint p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-pine-deep">Sign up</h2>

          {!user && (
            <div className="mt-4">
              <p className="text-ink-soft">
                You'll need an account to reserve a spot. It takes about a minute.
              </p>
              <div className="mt-4 flex gap-3">
                <Link to="/login">
                  <Button>Sign in</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="secondary">Create account</Button>
                </Link>
              </div>
            </div>
          )}

          {user && full && !signedUp && (
            <p className="mt-4 text-ink-soft">
              This event is full. Email serve@demo.church to join the waitlist.
            </p>
          )}

          {user && signedUp && !done && (
            <div className="mt-4">
              <p className="font-medium text-pine-deep">
                You're signed up for this event.
              </p>
              <Button
                variant="danger"
                className="mt-4"
                onClick={() => void cancelSignup(event.id, user.id)}
              >
                Cancel my sign-up
              </Button>
            </div>
          )}

          {user && done && (
            <div className="mt-4" role="status">
              <p className="font-medium text-pine-deep">
                You're in, {user.name}. We'll email details before the event.
              </p>
              <Link to="/dashboard" className="mt-4 inline-block">
                <Button variant="secondary">View my sign-ups</Button>
              </Link>
            </div>
          )}

          {user && !full && !signedUp && !done && (
            <div className="mt-4 space-y-4">
              <Field
                label="Anything we should know? (optional)"
                htmlFor="signup-note"
                hint="Allergies, availability limits, instrument you play, and so on."
              >
                <Textarea
                  id="signup-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional note for the organizers"
                />
              </Field>
              {error && (
                <p role="alert" className="text-sm font-medium text-red-800">
                  {error}
                </p>
              )}
              <Button onClick={() => void handleSignup()} disabled={busy}>
                {busy ? "Reserving your spot…" : `Reserve my spot`}
              </Button>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
