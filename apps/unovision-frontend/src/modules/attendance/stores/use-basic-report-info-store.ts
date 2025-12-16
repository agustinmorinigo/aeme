import { persist } from 'zustand/middleware';
import create from '@/config/store';
import type { AttendancesInfo, FileMetadata } from '@/modules/attendance/types/basic-report-info';
import type { ReportEmployee } from '@/modules/attendance/types/report-employee';
import type { SelectedPeriod } from '@/modules/attendance/types/selected-period';
import type { Organization } from '@aeme/supabase-client/entities';

interface SetFileDataParams {
  file: File;
  attendancesInfo: AttendancesInfo;
  selectedPeriod: SelectedPeriod;
}

interface State {
  monthNumber: number | null;
  yearNumber: number | null;
  organization: Organization | null;
  fileMetadata: FileMetadata | null;
  attendancesInfo: AttendancesInfo | null;
  employees: ReportEmployee[];
}

interface Actions {
  setFileData: (params: SetFileDataParams) => void;
  clearFileData: () => void;
  setPeriod: (selectedPeriod: SelectedPeriod) => void;
  setOrganization: (organization: Organization) => void;
  setEmployees: (employees: ReportEmployee[]) => void;
}

const useBasicReportInfoStore = create<State & Actions>()(
  persist(
    (set) => ({
      monthNumber: null,
      yearNumber: null,
      organization: null,
      fileMetadata: null,
      attendancesInfo: null,
      employees: [],

      setFileData: (params: SetFileDataParams) => {
        const { file, attendancesInfo, selectedPeriod } = params;
        set({
          fileMetadata: {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            validatedFilePeriod: selectedPeriod,
          },
          attendancesInfo,
        });
      },

      clearFileData: () => {
        set({
          fileMetadata: null,
          attendancesInfo: null,
        });
      },

      setPeriod: (selectedPeriod: SelectedPeriod) => {
        set({ monthNumber: selectedPeriod.monthNumber, yearNumber: selectedPeriod.yearNumber });
      },

      setOrganization: (organization: Organization) => {
        set({ organization });
      },

      setEmployees: (employees: ReportEmployee[]) => {
        set({ employees });
      },
    }),
    {
      name: 'basic-report-info',
      partialize: (state) => ({
        monthNumber: state.monthNumber,
        yearNumber: state.yearNumber,
        organization: state.organization,
        fileMetadata: state.fileMetadata,
        attendancesInfo: state.attendancesInfo,
        employees: state.employees,
      }),
    },
  ),
);

export default useBasicReportInfoStore;