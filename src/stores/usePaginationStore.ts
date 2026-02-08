import { create } from "zustand";

interface PaginationStoreProps {
  limit: number;
  offset: number;
  currentPage: number;
  setPagination: (offset: number, currentPage: number) => void;
}
export const usePaginationStore = create<PaginationStoreProps>((set) => ({
  limit: 8,
  offset: 0,
  currentPage: 1,
  setPagination: (offset: number, currentPage: number) => set({ offset, currentPage }),
}));
