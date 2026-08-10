import { useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { useLocale } from "@/context/LocaleContext";

const departmentIds = ["general", "missions", "youth", "music", "events"] as const;

export function About() {
  const { t } = useLocale();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    dept: departmentIds[0] as (typeof departmentIds)[number],
    message: "",
  });
  const [error, setError] = useState<string | null>(null);

  function handleSend() {
    if (!form.name.trim() || !form.email.includes("@") || !form.message.trim()) {
      setError(t.about.validationError);
      return;
    }
    setError(null);
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Reveal>
        <Eyebrow ko="소개" en="About" />
        <h1 className="mt-3 font-display text-4xl font-bold">{t.about.heading}</h1>
        <div className="mt-5 max-w-2xl space-y-4 leading-relaxed text-ink-soft">
          <p>{t.about.paragraph1}</p>
          <p>{t.about.paragraph2}</p>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <section aria-labelledby="contact-heading" className="mt-14 rounded-3xl border border-taupe-strong bg-white p-8 md:p-10">
          <h2 id="contact-heading" className="font-display text-2xl font-bold">
            {t.about.contactHeading}
          </h2>

          {sent ? (
            <p role="status" className="mt-4 font-medium text-pine-deep">
              {t.about.sentMessage}
            </p>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label={t.about.nameLabel} htmlFor="c-name">
                <Input
                  id="c-name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>
              <Field label={t.common.emailLabel} htmlFor="c-email">
                <Input
                  id="c-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label={t.about.deptLabel} htmlFor="c-dept">
                  <select
                    id="c-dept"
                    value={form.dept}
                    onChange={(e) =>
                      setForm({ ...form, dept: e.target.value as (typeof departmentIds)[number] })
                    }
                    className="w-full rounded-lg border border-taupe-strong bg-white px-4 py-2.5 text-ink focus:border-pine"
                  >
                    {departmentIds.map((id) => (
                      <option key={id} value={id}>
                        {t.about.departments[id]}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label={t.about.messageLabel} htmlFor="c-msg">
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
                <Button onClick={handleSend}>{t.about.sendMessage}</Button>
              </div>
            </div>
          )}
        </section>
      </Reveal>
    </div>
  );
}
