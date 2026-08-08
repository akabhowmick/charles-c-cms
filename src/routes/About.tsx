import { useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";

const departments = [
  "General question",
  "Missions",
  "Youth ministry",
  "Music / praise team",
  "Events & sign-ups",
];

export function About() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", dept: departments[0], message: "" });
  const [error, setError] = useState<string | null>(null);

  function handleSend() {
    if (!form.name.trim() || !form.email.includes("@") || !form.message.trim()) {
      setError("Add your name, a valid email, and a message so we can get back to you.");
      return;
    }
    setError(null);
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Reveal>
        <Eyebrow ko="소개" en="About" />
        <h1 className="mt-3 font-display text-4xl font-bold">Why this exists</h1>
        <div className="mt-5 max-w-2xl space-y-4 leading-relaxed text-ink-soft">
          <p>
            Serving at our church used to live in group chats, paper sign-up sheets, and
            one very overworked spreadsheet. Events got planned, but finding out about
            them depended on who you happened to talk to on Sunday.
          </p>
          <p>
            This site puts everything in one place: what's coming up, who it's for, how
            many spots are left, and a sign-up that takes two minutes. It was started by
            a student volunteer who got tired of watching adults spend more time on
            paperwork than with people.
          </p>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <section aria-labelledby="contact-heading" className="mt-14 rounded-3xl border border-taupe-light/60 bg-white p-8 md:p-10">
          <h2 id="contact-heading" className="font-display text-2xl font-bold">
            Get in touch
          </h2>

          {sent ? (
            <p role="status" className="mt-4 font-medium text-pine-deep">
              Message sent. Someone from the right team will reply within a few days.
            </p>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Name" htmlFor="c-name">
                <Input
                  id="c-name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>
              <Field label="Email" htmlFor="c-email">
                <Input
                  id="c-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Who should this go to?" htmlFor="c-dept">
                  <select
                    id="c-dept"
                    value={form.dept}
                    onChange={(e) => setForm({ ...form, dept: e.target.value })}
                    className="w-full rounded-lg border border-taupe-light bg-white px-4 py-2.5 text-ink focus:border-pine"
                  >
                    {departments.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Message" htmlFor="c-msg">
                  <Textarea
                    id="c-msg"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </Field>
              </div>
              {error && (
                <p role="alert" className="text-sm font-medium text-red-800 sm:col-span-2">
                  {error}
                </p>
              )}
              <div>
                <Button onClick={handleSend}>Send message</Button>
              </div>
            </div>
          )}
        </section>
      </Reveal>
    </div>
  );
}
