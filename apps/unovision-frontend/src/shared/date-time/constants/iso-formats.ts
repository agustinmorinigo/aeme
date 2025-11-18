const isoFormats = {
  dates: {
    fullDate: "yyyy-MM-dd"
  },
  times: {
    fullTime: "HH:mm:ss",
    fullTimeWithOffset: "HH:mm:ssXXX",
    fullTimeInUTC: "HH:mm:ss'Z'",
    timeWithoutSeconds: "HH:mm",
  },
  dateTimes: {
    fullDateTime: "yyyy-MM-dd'T'HH:mm:ss",
    fullDateTimeWithOffset: "yyyy-MM-dd'T'HH:mm:ssXXX",
    fullDateTimeInUTC: "yyyy-MM-dd'T'HH:mm:ss'Z'",
    dateTimeWithoutSeconds: "yyyy-MM-dd'T'HH:mm",
  }
}

export default isoFormats;