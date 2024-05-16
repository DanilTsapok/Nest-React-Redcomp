import { create } from "zustand";

const useStore = create((set) => ({
  // Login Btn
  activeBtnLogin: true,
  // Modal windows states
  authModalState: false,
  loginFormActive: true,
  registerFormActive: false,
  // Change DarkMode
  isChecked: localStorage.getItem("selectedTheme") === "light",
  switchCheck: () => set((state) => ({ isChecked: !state.isChecked })),

  // Auth Modal
  setAuthModalActive: () => set({ authModalState: true }),
  setAuthModalDisActive: () => set({ authModalState: false }),

  // Swap Login form with Register form
  setSwapLoginRegister: () =>
    set(() => ({
      loginFormActive: false,
      registerFormActive: true,
    })),

  setSwapRegisterLogin: () =>
    set(() => ({
      loginFormActive: true,
      registerFormActive: false,
    })),
}));
export default useStore;
