import { create } from "zustand";
const useBtnStore = create((set) => ({
    button1State: true,
    button2State: false,
    toggleButton1: () => set((state) => ({ button1State: true, button2State: false })),
  toggleButton2: () => set((state) => ({ button1State: false, button2State: true })),
}));
export default useBtnStore