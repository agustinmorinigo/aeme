import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  currentStep: number;
  totalSteps: number;
}

interface Actions {
  goToNextStep: () => void;
  goToPrevStep: () => void;
  canGoToNextStep: () => boolean;
  canGoToPrevStep: () => boolean;
}

const useAttendanceReportStepperStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      totalSteps: 7,

      goToNextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps) {
          set({ currentStep: currentStep + 1 });
        }
      },

      goToPrevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      canGoToNextStep: () => {
        const { currentStep, totalSteps } = get();
        return currentStep < totalSteps;
      },

      canGoToPrevStep: () => {
        const { currentStep } = get();
        return currentStep > 1;
      },
    }),
    {
      name: 'attendance-report-stepper',
      partialize: (state) => ({
        currentStep: state.currentStep,
        totalSteps: state.totalSteps,
      }),
    },
  ),
);

export default useAttendanceReportStepperStore;
