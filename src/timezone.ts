function toDate(value: Date | string) {
  return new Date(value);
}

function getTimeZoneOffsetMinutes(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(date);
  const lookup = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );
  const zonedTimestamp = Date.UTC(
    Number(lookup.year),
    Number(lookup.month) - 1,
    Number(lookup.day),
    Number(lookup.hour),
    Number(lookup.minute),
    Number(lookup.second),
  );

  return Math.round((zonedTimestamp - date.getTime()) / 60000);
}

export function formatTimeZone(
  date: Date | string,
  timeZone: string,
  locale = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
) {
  return new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(
    toDate(date),
  );
}

export function formatTimezoneOffset(date: Date | string = new Date()) {
  return getTimezoneOffsetString(date);
}

export function getTimezoneOffsetString(
  date: Date | string = new Date(),
  timeZone = getUserTimezone(),
) {
  const offset = getTimeZoneOffsetMinutes(toDate(date), timeZone);
  const sign = offset >= 0 ? "+" : "-";
  const hours = Math.floor(Math.abs(offset) / 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.abs(offset % 60)
    .toString()
    .padStart(2, "0");
  return `UTC${sign}${hours}:${minutes}`;
}

export function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function listAvailableTimeZones() {
  const supportedValuesOf = (
    Intl as typeof Intl & {
      supportedValuesOf?: (key: "timeZone") => string[];
    }
  ).supportedValuesOf;

  if (typeof supportedValuesOf === "function") {
    return supportedValuesOf("timeZone");
  }

  const userTimeZone = getUserTimezone();
  return Array.from(new Set(["UTC", userTimeZone].filter(Boolean)));
}

export function convertTimezone(date: Date | string, timeZone: string) {
  const source = toDate(date);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(source);
  const lookup = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );

  return new Date(
    Date.UTC(
      Number(lookup.year),
      Number(lookup.month) - 1,
      Number(lookup.day),
      Number(lookup.hour),
      Number(lookup.minute),
      Number(lookup.second),
    ),
  );
}

export type DurationStyle = "short" | "long" | "clock" | "compact" | "human";

export interface FormatDurationOptions {
  style?: DurationStyle;
}

export function formatDuration(
  seconds: number,
  options: FormatDurationOptions = {},
) {
  const { style = "short" } = options;

  if (seconds < 0) seconds = 0;

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  switch (style) {
    case "clock": {
      if (days > 0) {
        return `${days}:${String(hours).padStart(2, "0")}:${String(
          minutes,
        ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
      }

      if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(
          secs,
        ).padStart(2, "0")}`;
      }

      return `${minutes}:${String(secs).padStart(2, "0")}`;
    }

    case "compact": {
      const parts = [];

      if (days) parts.push(`${days}d`);
      if (hours) parts.push(`${hours}h`);
      if (minutes) parts.push(`${minutes}m`);
      if (secs || parts.length === 0) parts.push(`${secs}s`);

      return parts.join(" ");
    }

    case "long": {
      const parts = [];

      if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
      if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
      if (minutes) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
      if (secs || parts.length === 0)
        parts.push(`${secs} second${secs > 1 ? "s" : ""}`);

      return parts.join(", ");
    }

    case "human": {
      if (days) return `${days} day${days > 1 ? "s" : ""} ago`;
      if (hours) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      if (minutes) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

      return `${secs} second${secs > 1 ? "s" : ""} ago`;
    }

    case "short":
    default: {
      const parts = [];

      if (days) parts.push(`${days}d`);
      if (hours) parts.push(`${hours}hr`);
      if (minutes) parts.push(`${minutes}min`);
      if (secs || parts.length === 0) parts.push(`${secs}sec`);

      return parts.join(" ");
    }
  }
}
