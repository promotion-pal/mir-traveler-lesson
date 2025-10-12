import { create } from "zustand";

interface BearStore {
  bears: number;
  isLoad: boolean;
  increasePopulation: () => void;
  removeAllBears: () => void;
  sumStatistics: () => void;
}

const useBearStore = create<BearStore>((set, get) => ({
  bears: 0,
  isLoad: false,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  sumStatistics: () => {
    set({ isLoad: true });

    setTimeout(() => {
      set({ isLoad: false });
      alert(`Всего медведей: ${get().bears}`);
    }, 2000);
  },
}));

export { useBearStore };
