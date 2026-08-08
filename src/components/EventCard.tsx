import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { GROUP_LABELS, type ServeEvent } from "@/data/events";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export function EventCard({ event }: { event: ServeEvent }) {
  const spotsLeft = event.spotsTotal - event.spotsTaken;
  const full = spotsLeft <= 0;
  const group = GROUP_LABELS[event.group];

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-taupe-light/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-taupe/15">
      <div className="flex items-center justify-between gap-2">
        <Badge>
          <span lang="ko" className="mr-1.5 font-display">{group.ko}</span>
          {group.en}
        </Badge>
        {full ? (
          <span className="text-xs font-semibold text-red-800">Full</span>
        ) : (
          <span className="text-xs font-medium text-ink-soft">
            {spotsLeft} spots left
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-xl font-bold leading-snug">
        <Link
          to="/opportunities/$eventId"
          params={{ eventId: event.id }}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {event.title}
        </Link>
      </h3>
      <p lang="ko" className="mt-0.5 text-sm text-taupe">
        {event.titleKo}
      </p>

      <dl className="mt-4 space-y-1.5 text-sm text-ink-soft">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Date</dt>
          <CalendarDays size={15} aria-hidden="true" className="text-taupe" />
          <dd>{formatDate(event.date)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Location</dt>
          <MapPin size={15} aria-hidden="true" className="text-taupe" />
          <dd>{event.location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Capacity</dt>
          <Users size={15} aria-hidden="true" className="text-taupe" />
          <dd>
            {event.spotsTaken} of {event.spotsTotal} signed up
          </dd>
        </div>
      </dl>

      <div className="relative mt-5">
        <div
          role="progressbar"
          aria-valuenow={event.spotsTaken}
          aria-valuemin={0}
          aria-valuemax={event.spotsTotal}
          aria-label={`${event.spotsTaken} of ${event.spotsTotal} spots filled`}
          className="h-1.5 overflow-hidden rounded-full bg-paper-deep"
        >
          <div
            className="h-full rounded-full bg-pine transition-[width] duration-700"
            style={{ width: `${Math.min(100, (event.spotsTaken / event.spotsTotal) * 100)}%` }}
          />
        </div>
      </div>
    </article>
  );
}
