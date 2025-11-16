const timeZoneOffsets = {
  ar: '-03:00',
} as const;

export default timeZoneOffsets;

export type TimeZoneOffset = (typeof timeZoneOffsets)[keyof typeof timeZoneOffsets];