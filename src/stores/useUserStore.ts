import { create } from "zustand";
import type { User } from "../api/types";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  setUser: (user: User) => void;
  addTokens: (accessToken: string, refreshToken: string) => void;
  deleteTokens: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      tokens: {
        accessToken: null,
        refreshToken: null,
      },
      setUser: (user) => {
        set({ user: user });
      },
      addTokens: (accessToken: string, refreshToken: string) => {
        set({
          tokens: { accessToken, refreshToken },
        });
      },
      deleteTokens: () => {
        set({
          tokens: { accessToken: null, refreshToken: null },
        });
      },
      clearUser: () => {
        set({ user: null, tokens: { accessToken: null, refreshToken: null } });
      },
    }),

    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
