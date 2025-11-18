import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FormattedAttendancesInfo } from '@/modules/attendance/types/employee-attendance';

interface State {
  originalAttendancesInfo: FormattedAttendancesInfo | null;
  modifiedAttendancesInfo: FormattedAttendancesInfo | null;
  hasModified: boolean;
}

interface Actions {
  setOriginalAttendancesInfo: (info: FormattedAttendancesInfo) => void;
  setModifiedAttendancesInfo: (info: FormattedAttendancesInfo) => void;
  toggleHasModified: () => void;
}

const useAttendancesStore = create<State & Actions>()(
  persist(
    (set) => ({
      originalAttendancesInfo: null,
      modifiedAttendancesInfo: null,
      hasModified: false,
      setOriginalAttendancesInfo: (info) => set({ originalAttendancesInfo: info, modifiedAttendancesInfo: info }),
      setModifiedAttendancesInfo: (info) => set({ modifiedAttendancesInfo: info }),
      toggleHasModified: () => set((state) => ({ hasModified: !state.hasModified })),
    }),
    {
      name: 'attendances',
      partialize: (state) => ({
        originalAttendancesInfo: state.originalAttendancesInfo,
        modifiedAttendancesInfo: state.modifiedAttendancesInfo,
      }),
    },
  ),
);

export default useAttendancesStore;
