import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserResponseDTO } from "../dto/response/auth.response.dto";
import { getCurrentProfile } from "../user";
import axios from "axios";

interface AuthState {
  token: string | null;
  user: UserResponseDTO | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      // Called after successful login
      login: async (token: string) => {
        set({ token, isAuthenticated: true });

        try {
          // Decode or fetch user profile
          const user = await getCurrentProfile();
          set({ user });
        } catch (err) {
          console.error("Failed to fetch profile after login:", err);
        }
      },

      // Logout and clear data
      logout: async () => {
        set({ token: null, user: null, isAuthenticated: false });

        // Properly clear persisted storage
        await useAuthStore.persist.clearStorage();
      },

      refreshUser: async () => {
        try {
          const user = await getCurrentProfile();
          set({ user });
        } catch (err) {
          console.error("Failed to refresh user:", err);
        }
      },
    }),
    {
      name: "auth-storage", // Storage key
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
