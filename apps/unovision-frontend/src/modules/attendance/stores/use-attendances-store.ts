import { create } from 'zustand';
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

const useAttendancesStore = create<State & Actions>()((set) => ({
  originalAttendancesInfo: null,
  modifiedAttendancesInfo: null,
  hasModified: false,
  setOriginalAttendancesInfo: (info) => set({ originalAttendancesInfo: info, modifiedAttendancesInfo: info }),
  setModifiedAttendancesInfo: (info) => set({ modifiedAttendancesInfo: info }),
  toggleHasModified: () => set((state) => ({ hasModified: !state.hasModified })),
}));

export default useAttendancesStore;
