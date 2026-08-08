import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { supabase, isMockMode } from "@/lib/supabase";

export interface Signup {
  eventId: string;
  userId: string;
  userName: string;
  createdAt: string;
  note?: string;
}

interface SignupState {
  signups: Signup[];
  addSignup: (s: Omit<Signup, "createdAt">) => Promise<string | null>;
  cancelSignup: (eventId: string, userId: string) => Promise<void>;
  hasSignedUp: (eventId: string, userId: string) => boolean;
}

const SignupContext = createContext<SignupState | null>(null);

const seedSignups: Signup[] = [
  { eventId: "shoebox-2026", userId: "seed-1", userName: "Daniel Park", createdAt: "2026-08-01" },
  { eventId: "shoebox-2026", userId: "seed-2", userName: "Grace Yoon", createdAt: "2026-08-02" },
  { eventId: "mexico-mission-2026", userId: "seed-3", userName: "Joshua Lim", createdAt: "2026-07-28" },
];

export function SignupProvider({ children }: { children: ReactNode }) {
  const [signups, setSignups] = useState<Signup[]>(seedSignups);

  async function addSignup(s: Omit<Signup, "createdAt">): Promise<string | null> {
    if (signups.some((x) => x.eventId === s.eventId && x.userId === s.userId)) {
      return "You're already signed up for this event.";
    }
    const record: Signup = { ...s, createdAt: new Date().toISOString().slice(0, 10) };
    if (!isMockMode && supabase) {
      const { error } = await supabase.from("signups").insert({
        event_id: s.eventId,
        user_id: s.userId,
        note: s.note ?? null,
      });
      if (error) return error.message;
    }
    setSignups((prev) => [...prev, record]);
    return null;
  }

  async function cancelSignup(eventId: string, userId: string) {
    if (!isMockMode && supabase) {
      await supabase.from("signups").delete().match({ event_id: eventId, user_id: userId });
    }
    setSignups((prev) => prev.filter((s) => !(s.eventId === eventId && s.userId === userId)));
  }

  function hasSignedUp(eventId: string, userId: string) {
    return signups.some((s) => s.eventId === eventId && s.userId === userId);
  }

  return (
    <SignupContext.Provider value={{ signups, addSignup, cancelSignup, hasSignedUp }}>
      {children}
    </SignupContext.Provider>
  );
}

export function useSignups() {
  const ctx = useContext(SignupContext);
  if (!ctx) throw new Error("useSignups must be used inside SignupProvider");
  return ctx;
}
