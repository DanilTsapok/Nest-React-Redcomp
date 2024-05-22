import { create } from "zustand";

const useStore = create((set) => ({
  // Login user
  currentUser: localStorage.getItem("currentUser"),
  setCurrentUser: (state) => set({ currentUser: state }),
  // Login Btn
  activeBtnLogin: true,
  setActiveBtnLogin: () => set({ activeBtnLogin: false }),
  // Modal windows states
  notificationText: { status: false, text: "", img: "" },
  setNotificationText: (status, text, img) =>
    set({ notificationText: { status: status, text: text, img: img } }),
  authModalState: false,
  loginFormActive: true,
  registerFormActive: false,
  addCategoryModalActive: false,
  setAddCategoryModalActive: () => set({ addCategoryModalActive: true }),
  setAddCategoryModalDisActive: () => set({ addCategoryModalActive: false }),
  // Change DarkMode
  isChecked: localStorage.getItem("selectedTheme") === "light",
  switchCheck: () => set((state) => ({ isChecked: !state.isChecked })),
  countNotification: 0,
  setCountNotification: () =>
    set((state) => ({ countNotification: state.countNotification + 1 })),
  // Auth Modal
  setAuthModalActive: () => set({ authModalState: true }),
  setAuthModalDisActive: () => set({ authModalState: false }),

  notificationState: false,
  setNotificationState: () => set({ notificationState: true }),
  setNotificationStateDisabled: () => set({ notificationState: false }),
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
