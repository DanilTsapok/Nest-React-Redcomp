import { create } from "zustand";

const useStore = create((set) => ({
  // Change DarkMode
  isChecked: localStorage.getItem("selectedTheme") === "light",
  switchCheck: () => set((state) => ({ isChecked: !state.isChecked })),
}));
export default useStore;
