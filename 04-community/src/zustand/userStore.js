import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      // 새로운 사용자 정보를 전달받아 현재 user 상태를 갱신
      setUser: (newUser) =>
        set(
          produce((draft) => {
            draft.user = { ...newUser };
          })
        ),
      resetUser: () => set({ user: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
