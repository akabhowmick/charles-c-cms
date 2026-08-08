import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth, MOCK_ACCOUNTS } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";

export function Login() {
  const { signIn, isMock } = useAuth();
  const { t } = useLocale();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    setBusy(true);
    setError(null);
    const err = await signIn(email, password);
    setBusy(false);
    if (err === "no_matching_account") setError(t.auth.errors.noMatchingAccount);
    else if (err) setError(err);
    else void navigate({ to: "/dashboard" });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <Reveal>
        <Eyebrow ko="로그인" en="Sign in" />
        <h1 className="mt-3 font-display text-3xl font-bold">{t.auth.login.welcomeBack}</h1>

        <div className="mt-8 space-y-5">
          <Field label={t.common.emailLabel} htmlFor="login-email">
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && void handleSubmit()}
            />
          </Field>
          <Field label={t.common.passwordLabel} htmlFor="login-password">
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && void handleSubmit()}
            />
          </Field>
          {error && (
            <p role="alert" className="text-sm font-medium text-red-800">
              {error}
            </p>
          )}
          <Button className="w-full" onClick={() => void handleSubmit()} disabled={busy}>
            {busy ? t.auth.login.signingIn : t.common.signIn}
          </Button>
          <p className="text-center text-sm text-ink-soft">
            {t.auth.login.newHere}{" "}
            <Link to="/signup" className="font-semibold text-pine underline-offset-4 hover:underline">
              {t.auth.login.createAnAccount}
            </Link>
          </p>
        </div>

        {isMock && (
          <div className="mt-8 rounded-2xl bg-paper-deep p-5 text-sm">
            <h2 className="font-semibold">{t.auth.login.demoLoginsHeading}</h2>
            <ul className="mt-2 space-y-1 text-ink-soft">
              {MOCK_ACCOUNTS.map((a) => (
                <li key={a.email}>
                  <strong className="text-ink">
                    {a.role === "admin" ? t.auth.login.adminLabel : t.auth.login.volunteerLabel}:
                  </strong>{" "}
                  {a.email} / {a.password}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Reveal>
    </div>
  );
}

export function Signup() {
  const { signUp } = useAuth();
  const { t } = useLocale();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    setBusy(true);
    setError(null);
    const err = await signUp(name, email, password);
    setBusy(false);
    if (err === "invalid_signup") setError(t.auth.errors.invalidSignup);
    else if (err) setError(err);
    else void navigate({ to: "/dashboard" });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <Reveal>
        <Eyebrow ko="회원가입" en="Create account" />
        <h1 className="mt-3 font-display text-3xl font-bold">{t.auth.signup.joinIn}</h1>
        <p className="mt-2 text-sm text-ink-soft">{t.auth.signup.subtitle}</p>

        <div className="mt-8 space-y-5">
          <Field label={t.auth.signup.fullNameLabel} htmlFor="su-name">
            <Input
              id="su-name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label={t.common.emailLabel} htmlFor="su-email">
            <Input
              id="su-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label={t.common.passwordLabel} htmlFor="su-password" hint={t.auth.signup.passwordHint}>
            <Input
              id="su-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          {error && (
            <p role="alert" className="text-sm font-medium text-red-800">
              {error}
            </p>
          )}
          <Button className="w-full" onClick={() => void handleSubmit()} disabled={busy}>
            {busy ? t.auth.signup.creatingAccount : t.eventDetail.createAccount}
          </Button>
          <p className="text-center text-sm text-ink-soft">
            {t.auth.signup.alreadyHaveOne}{" "}
            <Link to="/login" className="font-semibold text-pine underline-offset-4 hover:underline">
              {t.common.signIn}
            </Link>
          </p>
        </div>
      </Reveal>
    </div>
  );
}
