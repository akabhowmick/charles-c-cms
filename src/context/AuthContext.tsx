import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase, isMockMode } from "@/lib/supabase";

export type Role = "admin" | "volunteer";

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface AuthState {
  user: AppUser | null;
  loading: boolean;
  isMock: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (name: string, email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

/** Demo accounts available in mock mode (no Supabase keys set). */
export const MOCK_ACCOUNTS = [
  { email: "charles@demo.church", password: "demo1234", name: "Charles", role: "admin" as Role },
  { email: "volunteer@demo.church", password: "demo1234", name: "Hana Kim", role: "volunteer" as Role },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(!isMockMode);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      if (s?.user) {
        setUser({
          id: s.user.id,
          email: s.user.email ?? "",
          name: (s.user.user_metadata?.name as string) ?? "Member",
          role: (s.user.user_metadata?.role as Role) ?? "volunteer",
        });
      }
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          name: (session.user.user_metadata?.name as string) ?? "Member",
          role: (session.user.user_metadata?.role as Role) ?? "volunteer",
        });
      } else {
        setUser(null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string): Promise<string | null> {
    if (isMockMode) {
      const acct = MOCK_ACCOUNTS.find(
        (a) => a.email === email.trim().toLowerCase() && a.password === password,
      );
      if (!acct) return "no_matching_account";
      setUser({ id: acct.email, email: acct.email, name: acct.name, role: acct.role });
      return null;
    }
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    return error ? error.message : null;
  }

  async function signUp(name: string, email: string, password: string): Promise<string | null> {
    if (isMockMode) {
      if (!name.trim() || !email.includes("@") || password.length < 8) {
        return "invalid_signup";
      }
      setUser({ id: email, email: email.trim().toLowerCase(), name: name.trim(), role: "volunteer" });
      return null;
    }
    const { error } = await supabase!.auth.signUp({
      email,
      password,
      options: { data: { name, role: "volunteer" } },
    });
    return error ? error.message : null;
  }

  async function signOut() {
    if (isMockMode) {
      setUser(null);
      return;
    }
    await supabase!.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ user, loading, isMock: isMockMode, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
