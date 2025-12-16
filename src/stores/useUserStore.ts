import { create } from "zustand";
import type { User } from "../api/types";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  addTokens: (accessToken: string, refreshToken: string) => void;
  deleteTokens: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => {
        set({ user: user });
      },
      addTokens: (accessToken: string, refreshToken: string) => {
        set((state) => {
          if (state.user) {
            return {
              user: {
                ...state.user,
                accessToken,
                refreshToken,
              },
            };
          }
          return state;
        });
      },
      deleteTokens: () => {
        set((state) => {
          if (state.user) {
            return {
              user: {
                ...state.user,
                accessToken: undefined,
                refreshToken: undefined,
              },
            };
          }
          return state;
        });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
