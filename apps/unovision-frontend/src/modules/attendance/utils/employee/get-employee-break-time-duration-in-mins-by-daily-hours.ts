const isPartTime = (dailyWorkingHours: number): boolean => {
  return dailyWorkingHours <= 6;
};

const isFullTime = (dailyWorkingHours: number): boolean => {
  return dailyWorkingHours === 7 || dailyWorkingHours === 8;
};

const isOfficeTime = (dailyWorkingHours: number): boolean => {
  return dailyWorkingHours === 9;
};

const getEmployeeBreakTimeDurationInMinsByDailyHours = (dailyWorkingHours: number): number => {
  if (isPartTime(dailyWorkingHours)) {
    return 20;
  } else if (isFullTime(dailyWorkingHours)) {
    return 30;
  } else if (isOfficeTime(dailyWorkingHours)) {
    return 40;
  } else {
    return 60;
  }
};

export default getEmployeeBreakTimeDurationInMinsByDailyHours;
