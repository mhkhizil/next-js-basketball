import create from 'zustand';

interface BtnStore {
  button1State: boolean;
  button2State: boolean;
  toggleButton1: () => void;
  toggleButton2: () => void;
}

const useBtnStore = create<BtnStore>((set) => ({
  button1State: true,
  button2State: false,
  toggleButton1: () => set((state) => ({ button1State: true, button2State: false })),
  toggleButton2: () => set((state) => ({ button1State: false, button2State: true })),
}));

export default useBtnStore;
