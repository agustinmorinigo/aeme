import { create } from 'zustand';

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

const useAttendanceReportStepperStore = create<State & Actions>()((set, get) => ({
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
}));

export default useAttendanceReportStepperStore;
