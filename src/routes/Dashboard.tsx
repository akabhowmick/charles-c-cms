import { Link } from "@tanstack/react-router";
import { events } from "@/data/events";
import { useAuth } from "@/context/AuthContext";
import { useSignups } from "@/context/SignupContext";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export function Dashboard() {
  const { user } = useAuth();
  const { signups, cancelSignup } = useSignups();

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold">Sign in first</h1>
        <p className="mt-3 text-ink-soft">This page shows your sign-ups once you're logged in.</p>
        <Link to="/login" className="mt-6 inline-block">
          <Button>Sign in</Button>
        </Link>
      </div>
    );
  }

  const mine = signups.filter((s) => s.userId === user.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <Reveal>
        <Eyebrow
          ko={user.role === "admin" ? "관리자" : "내 일정"}
          en={user.role === "admin" ? "Admin" : "My sign-ups"}
        />
        <h1 className="mt-3 font-display text-4xl font-bold">
          {user.role === "admin" ? `Welcome, ${user.name}` : `Hi, ${user.name}`}
        </h1>
      </Reveal>

      {/* Volunteer view: my signups */}
      <Reveal delay={100}>
        <section aria-labelledby="mine-heading" className="mt-10">
          <h2 id="mine-heading" className="font-display text-2xl font-bold">
            My sign-ups
          </h2>
          {mine.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-dashed border-taupe-light p-8 text-ink-soft">
              Nothing yet.{" "}
              <Link to="/opportunities" className="font-semibold text-pine underline-offset-4 hover:underline">
                Browse opportunities
              </Link>{" "}
              to reserve your first spot.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {mine.map((s) => {
                const ev = events.find((e) => e.id === s.eventId);
                if (!ev) return null;
                return (
                  <li
                    key={s.eventId}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-taupe-light/60 bg-white p-5"
                  >
                    <div>
                      <p className="font-display text-lg font-bold">{ev.title}</p>
                      <p className="text-sm text-ink-soft">
                        {formatDate(ev.date)} · {ev.location}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link to="/opportunities/$eventId" params={{ eventId: ev.id }}>
                        <Button variant="secondary" size="sm">
                          Details
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => void cancelSignup(ev.id, user.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </Reveal>

      {/* Admin view: roster per event */}
      {user.role === "admin" && (
        <Reveal delay={200}>
          <section aria-labelledby="roster-heading" className="mt-14">
            <h2 id="roster-heading" className="font-display text-2xl font-bold">
              Event rosters
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              The Excel replacement: every event and who's signed up, in one view.
            </p>
            <div className="mt-5 space-y-4">
              {events.map((ev) => {
                const roster = signups.filter((s) => s.eventId === ev.id);
                return (
                  <details
                    key={ev.id}
                    className="group rounded-2xl border border-taupe-light/60 bg-white"
                  >
                    <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-2 p-5 [&::-webkit-details-marker]:hidden">
                      <span className="font-display text-lg font-bold">{ev.title}</span>
                      <span className="text-sm text-ink-soft">
                        {ev.spotsTaken} signed up · {formatDate(ev.date)}
                      </span>
                    </summary>
                    <div className="border-t border-taupe-light/50 p-5">
                      {roster.length === 0 ? (
                        <p className="text-sm text-ink-soft">
                          No sign-ups through the site yet.
                        </p>
                      ) : (
                        <table className="w-full text-left text-sm">
                          <caption className="sr-only">
                            Sign-ups for {ev.title}
                          </caption>
                          <thead>
                            <tr className="text-xs uppercase tracking-wide text-taupe">
                              <th scope="col" className="pb-2 pr-4 font-semibold">Name</th>
                              <th scope="col" className="pb-2 pr-4 font-semibold">Signed up</th>
                              <th scope="col" className="pb-2 font-semibold">Note</th>
                            </tr>
                          </thead>
                          <tbody>
                            {roster.map((r) => (
                              <tr key={r.userId} className="border-t border-taupe-light/40">
                                <td className="py-2.5 pr-4 font-medium">{r.userName}</td>
                                <td className="py-2.5 pr-4 text-ink-soft">{r.createdAt}</td>
                                <td className="py-2.5 text-ink-soft">{r.note ?? "None"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </details>
                );
              })}
            </div>
          </section>
        </Reveal>
      )}
    </div>
  );
}
