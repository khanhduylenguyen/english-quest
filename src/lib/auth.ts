import { api, getToken, setToken } from "./api";

const USER_KEY = "engquest-user";

export type PublicUser = {
  id: string;
  username: string;
  email: string;
  name: string;
  grade: number | null;
  mascot: string | null;
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  completedLessons: Record<string, true>;
  quizScores: Record<string, { correct: number; total: number }>;
  createdAt: string;
};

export type AuthResponse = {
  token: string;
  user: PublicUser;
};

export function getStoredUser(): PublicUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as PublicUser) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: PublicUser | null): void {
  if (typeof window === "undefined") return;
  if (user) window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  else window.localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("engquest-auth"));
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  name?: string;
  grade?: number | null;
  mascot?: string | null;
};

export async function register(payload: RegisterPayload): Promise<PublicUser> {
  const { token, user } = await api<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: payload,
    auth: false,
  });
  setToken(token);
  setStoredUser(user);
  return user;
}

export async function login(creds: {
  emailOrUsername: string;
  password: string;
}): Promise<PublicUser> {
  const { token, user } = await api<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: creds,
    auth: false,
  });
  setToken(token);
  setStoredUser(user);
  return user;
}

export async function logout(): Promise<void> {
  setToken(null);
  setStoredUser(null);
}

export async function refreshUser(): Promise<PublicUser | null> {
  if (!getToken()) return null;
  try {
    const { user } = await api<{ user: PublicUser }>("/api/auth/me");
    setStoredUser(user);
    return user;
  } catch (err: any) {
    if (err?.status === 401) {
      await logout();
    }
    return null;
  }
}
